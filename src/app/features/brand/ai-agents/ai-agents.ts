import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AgentRun, AgentService } from '../../../core/services/agent.service';
import { BrandApiService } from '../../../core/services/brand-api.services';
import { AgentTrace } from '../../../shared/components/agent-trace/agent-trace';
import { Mascot } from '../../../shared/components/mascot/mascot';
import { crewAgent } from '../../../shared/components/mascot/crew';

type Decision = 'ACCEPT' | 'REJECT' | 'SKIP';

@Component({
  selector: 'app-brand-ai-agents',
  imports: [FormsModule, RouterLink, AgentTrace, Mascot],
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
  readonly shortlistAgent = crewAgent('shortlist');
  readonly copilotAgent = crewAgent('copilot');

  // Shortlist Agent
  campaignId: number | null = null;
  decisions: Record<number, Decision> = {};
  drafts: Record<number, string> = {};
  readonly copied = signal<number | null>(null);
  readonly discarded = signal(false);
  readonly shortlist = this.agents.createRun((payload) => this.prepareDecisions(payload));

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

    // A brief typed on the dashboard starts the Copilot straight away. It can't change anything without approval.
    const brief = history.state?.brief;
    if (typeof brief === 'string' && brief.trim()) {
      this.tab.set('copilot');
      this.brief = brief;
      this.startCopilot();
    }
  }

  stateText(run: AgentRun): string {
    if (run.error()) return 'Stopped';
    if (run.result()) return 'Finished';
    if (run.running()) return 'Working';
    if (run.pending()) return 'Needs you';
    return 'Ready';
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

  /** Every decision starts undecided, so the brand chooses rather than approving the AI's picks by default. */
  prepareDecisions(payload: any): void {
    this.decisions = {};
    this.drafts = {};
    for (const evaluation of payload.evaluations ?? []) {
      this.decisions[evaluation.application_id] = 'SKIP';
      this.drafts[evaluation.application_id] = evaluation.outreach_draft ?? '';
    }
  }

  openShortlist(): void {
    this.tab.set('shortlist');
    this.loadCampaigns(this.campaignId);
  }

  startReview(): void {
    if (this.campaignId) {
      this.discarded.set(false);
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
    this.discarded.set(false);
    this.shortlist.answer({ decisions });
  }

  /** Ends the paused run with no decisions, so nothing is changed. */
  discardReview(): void {
    this.discarded.set(true);
    this.shortlist.answer({ decisions: [] });
  }

  approveText(): string {
    const count = this.changeCount();
    if (count === 0) return 'Approve changes';
    return count === 1 ? 'Approve 1 change' : `Approve ${count} changes`;
  }

  proposalSummary(evaluations: any[]): string {
    const proposed = evaluations.filter((e) => e.proposed_action !== 'HOLD').length;
    const left = evaluations.length - proposed;
    if (proposed === 0) {
      return left === 1 ? 'The AI leaves this applicant to you' : `The AI leaves all ${left} applicants to you`;
    }
    const decisions = proposed === 1 ? '1 decision' : `${proposed} decisions`;
    return left === 0 ? `The AI proposes ${decisions}` : `The AI proposes ${decisions} and leaves ${left} to you`;
  }

  /** What approving would do right now, from the brand's current choices rather than the AI's. */
  decisionSummary(evaluations: any[]): { changes: { verb: string; name: string }[]; unchanged: string[] } {
    const changes: { verb: string; name: string }[] = [];
    const unchanged: string[] = [];
    for (const e of evaluations) {
      const decision = this.decisions[e.application_id];
      if (decision === 'ACCEPT') changes.push({ verb: 'Accept', name: e.applicant_name });
      else if (decision === 'REJECT') changes.push({ verb: 'Reject', name: e.applicant_name });
      else unchanged.push(e.applicant_name);
    }
    return { changes, unchanged };
  }

  criterionName(name: string): string {
    return ({ NICHE_RELEVANCE: 'Niche match', APPLICATION_RELEVANCE: 'Application relevance' } as Record<string, string>)[name] ?? name;
  }

  criterionMethod(method: string): string {
    return ({ 'exact match': 'Exact match', 'local AI': 'AI judgement' } as Record<string, string>)[method] ?? method;
  }

  outcomeText(outcome: string): string {
    const text: Record<string, string> = {
      ACCEPTED: 'Accepted',
      REJECTED: 'Rejected',
      SKIPPED_NOT_PENDING: 'Skipped, already decided',
    };
    return text[outcome] ?? outcome;
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
    return { ACCEPT: 'Accept', REJECT: 'Reject', HOLD: 'Leave to you' }[action] ?? action;
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
