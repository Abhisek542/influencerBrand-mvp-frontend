import { Component, computed, inject, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Mascot } from '../mascot/mascot';
import { CREW } from '../mascot/crew';

/** The dashboard's way into the crew: say what you need and an agent starts on it. */
@Component({
  selector: 'app-crew-strip',
  imports: [FormsModule, RouterLink, Mascot],
  template: `
    <section class="strip">
      <app-mascot mood="idle" [size]="72" />
      <div class="body">
        @if (role() === 'BRAND') {
          <h2>What should your crew work on?</h2>
          <form class="ask" (ngSubmit)="askCopilot()">
            <label class="sr-only" for="crew-brief">Describe a campaign</label>
            <input
              id="crew-brief"
              name="brief"
              [(ngModel)]="brief"
              placeholder="Describe a campaign in your own words"
              autocomplete="off"
            />
            <button type="submit" [disabled]="!brief.trim()">Start Copilot</button>
          </form>
          <p class="more">
            Or <a routerLink="/brand/ai-agents" [queryParams]="{ agent: 'shortlist' }">review applicants with Shortlist</a>.
            Nothing changes until you approve it.
          </p>
        } @else {
          <h2>Want your crew to look for campaigns?</h2>
          <div class="ask">
            <button type="button" (click)="askScout()">Find campaigns for me</button>
          </div>
          <p class="more">Scout drafts your pitch, and nothing is sent until you approve it.</p>
        }
      </div>
      <ul class="skills" aria-label="Agent skills">
        @for (skill of skills(); track skill) {
          <li>{{ skill }}</li>
        }
      </ul>
    </section>
  `,
  styles: `
    .strip {
      display: grid;
      grid-template-columns: auto minmax(0, 1fr) minmax(0, 300px);
      gap: 20px;
      align-items: center;
      background: var(--ink);
      color: #fff;
      border-radius: 16px;
      padding: 20px 24px;
      margin-bottom: 24px;
    }
    h2 { margin: 0 0 10px; font-family: var(--font-display); font-weight: 400; font-size: 22px; }
    .ask { display: flex; gap: 8px; flex-wrap: wrap; }
    input {
      flex: 1 1 220px;
      min-width: 0;
      padding: 10px 14px;
      border-radius: 10px;
      border: 1px solid var(--ink-3);
      background: var(--ink-2);
      color: #fff;
      font: inherit;
      font-size: 14px;
    }
    input::placeholder { color: #93a4b8; }
    button {
      margin: 0;
      padding: 10px 16px;
      border-radius: 10px;
      background: var(--mint);
      color: var(--ink);
      font: inherit;
      font-size: 14px;
      font-weight: 600;
    }
    button:disabled { opacity: 0.5; cursor: not-allowed; }
    .more { margin: 10px 0 0; font-size: 13px; color: #b6c4d3; }
    .more a { color: var(--mint); }
    .skills { list-style: none; display: flex; flex-wrap: wrap; gap: 6px; margin: 0; padding: 0; }
    .skills li {
      padding: 4px 10px;
      border-radius: 999px;
      border: 1px solid var(--ink-3);
      font-size: 12px;
      color: #cdd8e4;
    }
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      overflow: hidden;
      clip-path: inset(50%);
    }
    @media (max-width: 1100px) {
      .strip { grid-template-columns: auto minmax(0, 1fr); }
      .skills { display: none; }
    }
    @media (max-width: 520px) {
      .strip { grid-template-columns: minmax(0, 1fr); padding: 18px; }
    }
  `,
})
export class CrewStrip {
  private router = inject(Router);

  readonly role = input.required<'BRAND' | 'INFLUENCER'>();
  brief = '';

  readonly skills = computed(() =>
    CREW.filter((a) => a.forWho === (this.role() === 'BRAND' ? 'Brands' : 'Creators')).flatMap((a) => a.skills),
  );

  askCopilot(): void {
    if (this.brief.trim()) {
      this.router.navigate(['/brand/ai-agents'], { state: { brief: this.brief.trim() } });
    }
  }

  askScout(): void {
    this.router.navigate(['/influencer/ai-scout'], { state: { autostart: true } });
  }
}
