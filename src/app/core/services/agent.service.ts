import { Injectable, signal } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthStateService } from './auth-state.service';

export interface AgentEvent {
  type: 'run' | 'step' | 'interrupt' | 'done' | 'error';
  run_id?: string;
  message?: string;
  code?: string;
  payload?: any;
  result?: any;
}

/** Holds the live state of one agent run. Signals keep the zoneless UI updated as events arrive. */
export class AgentRun {
  readonly steps = signal<string[]>([]);
  readonly running = signal(false);
  readonly pending = signal<any | null>(null);
  readonly result = signal<any | null>(null);
  readonly error = signal('');

  private runId = '';
  private subscription?: Subscription;

  constructor(
    private agents: AgentService,
    private onPause: (payload: any) => void = () => {},
  ) {}

  start(path: string, body?: unknown): void {
    this.steps.set([]);
    this.pending.set(null);
    this.result.set(null);
    this.consume(this.agents.post(`/agents/${path}/runs`, body ?? {}));
  }

  /** The approval card stays up until the agent responds, so a refused answer can be corrected. */
  answer(value: unknown): void {
    this.consume(this.agents.post(`/agents/runs/${this.runId}/resume`, { value }));
  }

  reset(): void {
    this.subscription?.unsubscribe();
    this.steps.set([]);
    this.running.set(false);
    this.pending.set(null);
    this.result.set(null);
    this.error.set('');
  }

  private consume(events: Observable<AgentEvent>): void {
    this.subscription?.unsubscribe();
    this.error.set('');
    this.running.set(true);
    this.subscription = events.subscribe({
      next: (event) => this.handle(event),
      error: () => {
        this.error.set('The AI service could not be reached. The rest of InfluencerHub still works.');
        this.running.set(false);
      },
      complete: () => this.running.set(false),
    });
  }

  private handle(event: AgentEvent): void {
    switch (event.type) {
      case 'run':
        this.runId = event.run_id ?? this.runId;
        break;
      case 'step':
        this.pending.set(null);
        this.steps.update((steps) => [...steps, event.message ?? '']);
        break;
      case 'interrupt':
        this.onPause(event.payload);
        this.pending.set(event.payload);
        setTimeout(() =>
          document.querySelector('[data-agent-pause]')?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
        );
        break;
      case 'done':
        this.pending.set(null);
        this.result.set(event.result);
        break;
      case 'error':
        this.error.set(event.message ?? 'Something went wrong.');
        break;
    }
  }
}

@Injectable({ providedIn: 'root' })
export class AgentService {
  constructor(private authState: AuthStateService) {}

  createRun(onPause?: (payload: any) => void): AgentRun {
    return new AgentRun(this, onPause);
  }

  /**
   * Uses fetch rather than HttpClient to read the response as it streams.
   * Fetch skips the auth interceptor, so the token is added here.
   */
  post(path: string, body: unknown): Observable<AgentEvent> {
    return new Observable<AgentEvent>((subscriber) => {
      const controller = new AbortController();

      const run = async () => {
        if (!environment.aiServerUrl) {
          subscriber.next({ type: 'error', message: 'AI agents are only available in the local demo.' });
          subscriber.complete();
          return;
        }
        const response = await fetch(`${environment.aiServerUrl}${path}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.authState.getToken()}`,
          },
          body: JSON.stringify(body),
          signal: controller.signal,
        });

        if (!response.ok) {
          subscriber.next({ type: 'error', message: await this.errorMessage(response) });
          subscriber.complete();
          return;
        }

        const reader = response.body!.pipeThrough(new TextDecoderStream()).getReader();
        let buffer = '';
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          buffer += value;
          const lines = buffer.split('\n');
          buffer = lines.pop() ?? '';
          for (const line of lines) {
            if (line.trim()) subscriber.next(JSON.parse(line));
          }
        }
        subscriber.complete();
      };

      run().catch((error) => {
        if (error?.name !== 'AbortError') subscriber.error(error);
      });
      return () => controller.abort();
    });
  }

  private async errorMessage(response: Response): Promise<string> {
    if (response.status === 401) return 'Your session has expired. Please log in again.';
    if (response.status === 403) return "This agent isn't available for your account.";
    if (response.status === 404) return 'This agent run has ended. Please start again.';
    if (response.status === 422) {
      const body = await response.json().catch(() => null);
      if (Array.isArray(body?.detail) && body.detail[0]?.message) {
        return body.detail.map((d: any) => `${String(d.field).split('.').pop()}: ${d.message}`).join('; ');
      }
      return 'Please check the details and try again.';
    }
    return 'The AI service reported an error.';
  }
}
