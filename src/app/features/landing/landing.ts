import { Component, OnDestroy, OnInit, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthStateService } from '../../core/services/auth-state.service';
import { Mascot, MascotMood } from '../../shared/components/mascot/mascot';
import { CREW } from '../../shared/components/mascot/crew';

/** Same wording as the real Shortlist agent's activity. */
const EXAMPLE_STEPS = [
  'Reading the campaign and its applications',
  'Found 2 pending of 2 applications',
  'Assessing Asha (1 of 2)',
  'Assessing Rohan (2 of 2)',
  'Drafting a message to Asha',
];

type ExampleStage = 'working' | 'waiting' | 'approved' | 'declined';

@Component({
  selector: 'app-landing',
  imports: [RouterLink, Mascot],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
})
export class Landing implements OnInit, OnDestroy {
  private auth = inject(AuthStateService);
  private timer?: ReturnType<typeof setTimeout>;

  readonly crew = CREW;
  readonly steps = signal<string[]>([]);
  readonly stage = signal<ExampleStage>('working');

  readonly workspace = computed(() => {
    const role = this.auth.getRole();
    return role === 'BRAND' ? '/brand/dashboard' : role === 'INFLUENCER' ? '/influencer/dashboard' : null;
  });

  readonly mood = computed<MascotMood>(() => {
    const moods: Record<ExampleStage, MascotMood> = {
      working: 'working',
      waiting: 'waiting',
      approved: 'done',
      declined: 'idle',
    };
    return moods[this.stage()];
  });

  readonly status = computed(() => {
    const statuses: Record<ExampleStage, string> = {
      working: 'Working on it',
      waiting: 'Waiting for your decision',
      approved: 'Finished. Asha is accepted.',
      declined: 'Stopped. Nothing was changed.',
    };
    return statuses[this.stage()];
  });

  ngOnInit(): void {
    this.playExample();
  }

  ngOnDestroy(): void {
    clearTimeout(this.timer);
  }

  playExample(): void {
    clearTimeout(this.timer);
    this.stage.set('working');
    this.steps.set([]);

    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      this.steps.set(EXAMPLE_STEPS);
      this.stage.set('waiting');
      return;
    }
    this.nextStep(0);
  }

  decide(approved: boolean): void {
    this.stage.set(approved ? 'approved' : 'declined');
  }

  private nextStep(index: number): void {
    this.timer = setTimeout(() => {
      if (index === EXAMPLE_STEPS.length) {
        this.stage.set('waiting');
        return;
      }
      this.steps.update((steps) => [...steps, EXAMPLE_STEPS[index]]);
      this.nextStep(index + 1);
    }, 850);
  }
}
