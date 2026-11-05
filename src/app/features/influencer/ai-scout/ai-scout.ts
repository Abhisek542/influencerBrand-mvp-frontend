import { Component, OnDestroy, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AgentService } from '../../../core/services/agent.service';
import { AgentTrace } from '../../../shared/components/agent-trace/agent-trace';

@Component({
  selector: 'app-influencer-ai-scout',
  imports: [FormsModule, RouterLink, AgentTrace],
  templateUrl: './ai-scout.html',
  styleUrl: '../../../shared/components/agent-trace/agent-pages.css',
})
export class InfluencerAiScout implements OnDestroy {
  private agents = inject(AgentService);

  application = { message: '', influencerName: '', niche: '', platform: '' };

  readonly scout = this.agents.createRun((payload) => {
    if (payload.kind === 'approve_application') {
      const { message, influencerName, niche, platform } = payload.draft;
      this.application = { message, influencerName, niche, platform };
    }
  });

  ngOnDestroy(): void {
    this.scout.reset();
  }

  find(): void {
    this.scout.start('scout');
  }

  choose(campaignId: number | null): void {
    this.scout.answer({ campaign_id: campaignId });
  }

  canSubmit(): boolean {
    const a = this.application;
    return !!(a.message.trim() && a.influencerName.trim() && a.niche.trim() && a.platform.trim());
  }

  approve(): void {
    this.scout.answer({ approved: true, application: this.application });
  }

  discard(): void {
    this.scout.answer({ approved: false, application: null });
  }
}
