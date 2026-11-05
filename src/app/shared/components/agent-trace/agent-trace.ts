import { Component, computed, input } from '@angular/core';
import { AgentRun } from '../../../core/services/agent.service';
import { Mascot, MascotMood, MascotTone } from '../mascot/mascot';

/** The live view of a run: what the agent is doing now, how far along it is, and every step so far. */
@Component({
  selector: 'app-agent-trace',
  imports: [Mascot],
  template: `
    <section class="console" [class.waiting]="mood() === 'waiting'" aria-label="Agent activity">
      <header>
        <app-mascot [mood]="mood()" [tone]="tone()" [size]="56" />
        <div>
          <p class="agent">{{ agent() }}</p>
          <p class="status" role="status">{{ status() }}</p>
        </div>
      </header>

      <ol class="stages" aria-hidden="true">
        @for (stage of stages; track stage; let i = $index) {
          <li [class.on]="stageIndex() >= i" [class.now]="stageIndex() === i">{{ stage }}</li>
        }
      </ol>

      @if (run().steps().length) {
        <ol class="log">
          @for (step of run().steps(); track $index; let last = $last) {
            <li [class.current]="last && mood() === 'working'">
              <span class="mark" aria-hidden="true"></span>
              <span>{{ step }}</span>
            </li>
          }
        </ol>
      } @else {
        <p class="empty">{{ mood() === 'working' ? 'Starting up' : 'Activity will appear here as the agent works.' }}</p>
      }
    </section>
  `,
  styles: `
    .console {
      background: var(--ink);
      color: #e8eef5;
      border-radius: 16px;
      padding: 18px;
      border: 1px solid var(--ink-3);
    }
    .console.waiting { border-color: var(--amber); }
    header { display: flex; align-items: center; gap: 12px; }
    .agent {
      margin: 0;
      font-size: 11px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #93a4b8;
    }
    .status { margin: 2px 0 0; font-size: 16px; font-weight: 500; line-height: 1.3; }
    .stages {
      list-style: none;
      display: flex;
      gap: 6px;
      margin: 16px 0 0;
      padding: 0;
    }
    .stages li {
      flex: 1;
      min-width: 0;
      padding-top: 7px;
      border-top: 3px solid var(--ink-3);
      font-size: 11px;
      color: #7b8ca1;
    }
    .stages li.on { border-color: var(--mint); color: #cdd8e4; }
    .stages li.now { color: #fff; font-weight: 600; }
    .log {
      list-style: none;
      margin: 16px 0 0;
      padding: 0;
      font-size: 13px;
      max-height: 340px;
      overflow-y: auto;
    }
    .log li {
      position: relative;
      display: flex;
      gap: 10px;
      padding: 0 0 10px;
      color: #b6c4d3;
      overflow-wrap: anywhere;
    }
    .log li:not(:last-child)::before {
      content: '';
      position: absolute;
      left: 4px;
      top: 12px;
      bottom: -2px;
      width: 1px;
      background: var(--ink-3);
    }
    .mark {
      flex-shrink: 0;
      width: 9px;
      height: 9px;
      margin-top: 5px;
      border-radius: 50%;
      background: var(--mint);
    }
    li.current { color: #fff; font-weight: 500; }
    li.current .mark { animation: pulse 0.9s ease-in-out infinite; }
    .empty { margin: 14px 0 0; font-size: 13px; color: #93a4b8; }
    @keyframes pulse { 50% { opacity: 0.25; } }
    @media (prefers-reduced-motion: reduce) { li.current .mark { animation: none; } }
  `,
})
export class AgentTrace {
  readonly run = input.required<AgentRun>();
  readonly agent = input('AI agent');
  readonly tone = input<MascotTone>('mint');

  readonly stages = ['Working', 'Your turn', 'Done'];

  readonly mood = computed<MascotMood>(() => {
    const run = this.run();
    if (run.error()) return 'error';
    if (run.result()) return 'done';
    if (run.running()) return 'working';
    if (run.pending()) return 'waiting';
    return 'idle';
  });

  readonly stageIndex = computed(() => {
    const index = { idle: -1, working: 0, error: 0, waiting: 1, done: 2 };
    return index[this.mood()];
  });

  readonly status = computed(() => {
    switch (this.mood()) {
      case 'error':
        return 'Stopped before finishing';
      case 'done':
        return 'Finished';
      case 'working':
        return 'Working on it';
      case 'waiting':
        return this.run().pending()?.kind === 'question'
          ? 'Needs an answer from you'
          : 'Waiting for your decision';
      default:
        return 'Ready when you are';
    }
  });
}
