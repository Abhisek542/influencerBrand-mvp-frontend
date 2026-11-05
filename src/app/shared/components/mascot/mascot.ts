import { Component, computed, input } from '@angular/core';

export type MascotMood = 'idle' | 'working' | 'waiting' | 'done' | 'error';
export type MascotTone = 'mint' | 'sky' | 'amber';

/** Pip, the InfluencerHub crew mascot. The mood mirrors what an agent is actually doing. */
@Component({
  selector: 'app-mascot',
  template: `
    <svg
      viewBox="0 0 120 124"
      [attr.width]="size()"
      [attr.height]="size()"
      [attr.class]="'pip ' + mood() + ' ' + tone()"
      [attr.role]="label() ? 'img' : null"
      [attr.aria-label]="label() || null"
      [attr.aria-hidden]="label() ? null : 'true'"
    >
      <ellipse class="shadow" cx="60" cy="116" rx="26" ry="4" />
      <g class="float">
        <line class="stem" x1="60" y1="26" x2="60" y2="13" />
        <circle class="orb" cx="60" cy="10" r="6" />
        <rect class="ear" x="9" y="50" width="10" height="22" rx="5" />
        <rect class="ear" x="101" y="50" width="10" height="22" rx="5" />
        <rect class="head" x="17" y="26" width="86" height="72" rx="30" />
        <rect class="visor" x="28" y="38" width="64" height="38" rx="19" />
        @if (mood() === 'done') {
          <path class="eye-line" d="M41 60 q6 -9 12 0" />
          <path class="eye-line" d="M67 60 q6 -9 12 0" />
        } @else if (mood() === 'error') {
          <path class="eye-line" d="M41 57 h12" />
          <path class="eye-line" d="M67 57 h12" />
        } @else {
          <g class="eyes">
            <ellipse class="eye" cx="47" cy="57" rx="6" ry="8" />
            <ellipse class="eye" cx="73" cy="57" rx="6" ry="8" />
          </g>
        }
        <path class="mouth" [attr.d]="mouth()" />
      </g>
    </svg>
  `,
  styles: `
    :host { display: inline-flex; line-height: 0; flex-shrink: 0; }
    .pip { overflow: visible; --accent: var(--mint); }
    .pip.sky { --accent: var(--sky); }
    .pip.amber { --accent: var(--amber); }
    .head { fill: #f6fbf8; stroke: var(--accent); stroke-width: 3; }
    .visor { fill: var(--ink); }
    .ear, .orb { fill: var(--accent); }
    .stem { fill: none; stroke: var(--accent); stroke-width: 4; stroke-linecap: round; }
    .eye { fill: var(--accent); transform-box: fill-box; transform-origin: center; }
    .eye-line { fill: none; stroke: var(--accent); stroke-width: 4; stroke-linecap: round; }
    .mouth { fill: none; stroke: var(--ink); stroke-width: 3; stroke-linecap: round; }
    .shadow { fill: rgba(10, 22, 40, 0.18); }

    .waiting .orb, .waiting .ear { fill: var(--amber); }
    .error .orb, .error .ear { fill: var(--coral); }
    .error .eye-line { stroke: var(--coral); }

    .float { animation: bob 3.6s ease-in-out infinite; }
    .eye { animation: blink 5s infinite; }
    .working .float { animation-duration: 1.6s; }
    .working .eyes { animation: scan 1.4s ease-in-out infinite; }
    .working .orb { animation: pulse 0.9s ease-in-out infinite; }
    .waiting .orb { animation: pulse 1.8s ease-in-out infinite; }
    .done .float { animation: hop 0.7s ease-out 1; }

    @keyframes bob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
    @keyframes hop { 0%, 100% { transform: translateY(0); } 40% { transform: translateY(-10px); } }
    @keyframes blink { 0%, 94%, 100% { transform: scaleY(1); } 97% { transform: scaleY(0.1); } }
    @keyframes scan { 0%, 100% { transform: translateX(-5px); } 50% { transform: translateX(5px); } }
    @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.35; } }

    @media (prefers-reduced-motion: reduce) {
      .float, .eye, .eyes, .orb { animation: none !important; }
    }
  `,
})
export class Mascot {
  readonly mood = input<MascotMood>('idle');
  readonly tone = input<MascotTone>('mint');
  readonly size = input(96);
  /** Leave empty when the mascot is decorative. */
  readonly label = input('');

  readonly mouth = computed(() => {
    switch (this.mood()) {
      case 'done':
        return 'M50 84 q10 9 20 0';
      case 'error':
        return 'M52 89 q8 -6 16 0';
      case 'working':
        return 'M55 87 h10';
      case 'waiting':
        return 'M54 85 q6 5 12 0';
      default:
        return 'M52 84 q8 6 16 0';
    }
  });
}
