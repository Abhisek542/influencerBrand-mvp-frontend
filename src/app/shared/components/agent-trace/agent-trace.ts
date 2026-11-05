import { Component, input } from '@angular/core';

/** Shows what the agent is doing as it works. */
@Component({
  selector: 'app-agent-trace',
  template: `
    @if (steps().length > 0 || running()) {
      <ol class="trace" aria-live="polite">
        @for (step of steps(); track $index) {
          <li [class.current]="running() && $last">
            @if (running() && $last) {
              <span class="spinner small"></span>
            } @else {
              <span class="tick">✓</span>
            }
            <span>{{ step }}</span>
          </li>
        }
        @if (running() && steps().length === 0) {
          <li class="current"><span class="spinner small"></span><span>Starting the agent</span></li>
        }
      </ol>
    }
  `,
  styles: `
    .trace {
      list-style: none;
      margin: 16px 0;
      padding: 14px 16px;
      background: #f0fdf4;
      border: 1px solid #bbf7d0;
      border-radius: 10px;
      font-size: 14px;
      color: #374151;
    }
    li {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 3px 0;
    }
    li.current {
      font-weight: 600;
      color: #065f46;
    }
    .tick {
      width: 16px;
      text-align: center;
      color: #065f46;
    }
    .spinner.small {
      width: 16px;
      height: 16px;
      border-width: 2px;
    }
  `,
})
export class AgentTrace {
  readonly steps = input.required<string[]>();
  readonly running = input(false);
}
