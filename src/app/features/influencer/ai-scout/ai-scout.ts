import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AgentService } from '../../../core/services/agent.service';
import { AgentTrace } from '../../../shared/components/agent-trace/agent-trace';
import { Mascot } from '../../../shared/components/mascot/mascot';
import { crewAgent } from '../../../shared/components/mascot/crew';

@Component({
  selector: 'app-influencer-ai-scout',
  imports: [FormsModule, RouterLink, AgentTrace, Mascot],
  templateUrl: './ai-scout.html',
  styleUrl: '../../../shared/components/agent-trace/agent-pages.css',
})
export class InfluencerAiScout implements OnInit, OnDestroy {
  private agents = inject(AgentService);

  readonly agent = crewAgent('scout');

  application = { message: '', influencerName: '', niche: '', platform: '' };

  readonly scout = this.agents.createRun((payload) => {
    if (payload.kind === 'approve_application') {
      const { message, influencerName, niche, platform } = payload.draft;
      this.application = { message, influencerName, niche, platform };
    }
  });

  ngOnInit(): void {
    if (history.state?.autostart) {
      this.find();
    }
  }

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
