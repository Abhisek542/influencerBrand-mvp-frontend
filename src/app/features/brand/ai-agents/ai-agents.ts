import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AgentService } from '../../../core/services/agent.service';
import { BrandApiService } from '../../../core/services/brand-api.services';
import { AgentTrace } from '../../../shared/components/agent-trace/agent-trace';

type Decision = 'ACCEPT' | 'REJECT' | 'SKIP';

@Component({
  selector: 'app-brand-ai-agents',
  imports: [FormsModule, RouterLink, AgentTrace],
  templateUrl: './ai-agents.html',
  styleUrl: '../../../shared/components/agent-trace/agent-pages.css',
})
export class BrandAiAgents implements OnInit, OnDestroy {
  private agents = inject(AgentService);
  private brandApi = inject(BrandApiService);
  private route = inject(ActivatedRoute);

  readonly tab = signal<'shortlist' | 'copilot'>('shortlist');
  readonly campaigns = signal<any[]>([]);
  readonly campaignsError = signal('');

  // Shortlist Agent
  campaignId: number | null = null;
  decisions: Record<number, Decision> = {};
  drafts: Record<number, string> = {};
  readonly copied = signal<number | null>(null);
  readonly shortlist = this.agents.createRun((payload) => {
    this.decisions = {};
    this.drafts = {};
    for (const evaluation of payload.evaluations ?? []) {
      this.decisions[evaluation.application_id] =
        evaluation.proposed_action === 'HOLD' ? 'SKIP' : evaluation.proposed_action;
      this.drafts[evaluation.application_id] = evaluation.outreach_draft ?? '';
    }
  });

  // Campaign Copilot
  brief = '';
  questionAnswer = '';
  campaign: any = {};
  readonly copilot = this.agents.createRun((payload) => {
    this.questionAnswer = '';
    if (payload.kind === 'approve_campaign') {
      this.campaign = { ...payload.proposal };
    }
  });

  ngOnInit(): void {
    const requested = Number(this.route.snapshot.queryParamMap.get('campaign'));
    this.loadCampaigns(requested || null);
  }

  ngOnDestroy(): void {
    this.shortlist.reset();
    this.copilot.reset();
  }

  private loadCampaigns(select: number | null): void {
    this.brandApi.getMyCampaigns(0, 50).subscribe({
      next: (page) => {
        this.campaigns.set(page.content ?? []);
        const ids = this.campaigns().map((c) => c.id);
        this.campaignId = select && ids.includes(select) ? select : (ids[0] ?? null);
      },
      error: () => this.campaignsError.set('Your campaigns could not be loaded.'),
    });
  }

  // ---- Shortlist Agent

  openShortlist(): void {
    this.tab.set('shortlist');
    this.loadCampaigns(this.campaignId);
  }

  startReview(): void {
    if (this.campaignId) {
      this.shortlist.start('shortlist', { campaign_id: Number(this.campaignId) });
    }
  }

  changeCount(): number {
    return Object.values(this.decisions).filter((d) => d !== 'SKIP').length;
  }

  applyDecisions(): void {
    const decisions = Object.entries(this.decisions).map(([id, action]) => ({
      application_id: Number(id),
      action,
    }));
    this.shortlist.answer({ decisions });
  }

  labelText(label: string): string {
    return (
      {
        STRONG_MATCH: 'Strong match',
        POTENTIAL_MATCH: 'Potential match',
        WEAK_MATCH: 'Weak match',
        INSUFFICIENT_EVIDENCE: 'Not enough evidence',
      }[label] ?? label
    );
  }

  labelClass(label: string): string {
    return (
      { STRONG_MATCH: 'strong', POTENTIAL_MATCH: 'potential', WEAK_MATCH: 'weak' }[label] ?? ''
    );
  }

  actionText(action: string): string {
    return { ACCEPT: 'Accept', REJECT: 'Reject', HOLD: 'Leave for you to decide' }[action] ?? action;
  }

  async copyDraft(applicationId: number): Promise<void> {
    await navigator.clipboard.writeText(this.drafts[applicationId] ?? '');
    this.copied.set(applicationId);
  }

  // ---- Campaign Copilot

  startCopilot(): void {
    if (this.brief.trim()) {
      this.copilot.start('copilot', { brief: this.brief });
    }
  }

  sendAnswer(): void {
    if (this.questionAnswer.trim()) {
      this.copilot.answer({ answer: this.questionAnswer });
    }
  }

  approveCampaign(): void {
    this.copilot.answer({
      approved: true,
      campaign: { ...this.campaign, budget: String(this.campaign.budget ?? '') },
    });
  }

  discardCampaign(): void {
    this.copilot.answer({ approved: false, campaign: null });
  }

  startAnother(): void {
    this.brief = '';
    this.copilot.reset();
    this.loadCampaigns(this.campaignId);
  }
}
