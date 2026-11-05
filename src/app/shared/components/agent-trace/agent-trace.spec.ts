import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentRun, AgentService } from '../../../core/services/agent.service';
import { AgentTrace } from './agent-trace';

describe('AgentTrace', () => {
  let fixture: ComponentFixture<AgentTrace>;
  let run: AgentRun;

  beforeEach(() => {
    run = TestBed.inject(AgentService).createRun();
    fixture = TestBed.createComponent(AgentTrace);
    fixture.componentRef.setInput('run', run);
    fixture.detectChanges();
  });

  function status(): string {
    fixture.detectChanges();
    return fixture.nativeElement.querySelector('.status').textContent;
  }

  it('is ready before a run starts', () => {
    expect(status()).toBe('Ready when you are');
  });

  it('shows the work in progress and every step', () => {
    run.running.set(true);
    run.steps.set(['Reading your brief']);

    expect(status()).toBe('Working on it');
    expect(fixture.nativeElement.querySelector('.log').textContent).toContain('Reading your brief');
  });

  it('tells a question apart from an approval', () => {
    run.pending.set({ kind: 'question' });
    expect(status()).toBe('Needs an answer from you');

    run.pending.set({ kind: 'approve_campaign' });
    expect(status()).toBe('Waiting for your decision');
  });

  it('still reports working while an approval is being carried out', () => {
    run.pending.set({ kind: 'approve_campaign' });
    run.running.set(true);

    expect(status()).toBe('Working on it');
  });

  it('reports errors ahead of anything else', () => {
    run.running.set(true);
    run.error.set('The AI service reported an error.');

    expect(status()).toBe('Stopped before finishing');
  });

  it('reports a finished run', () => {
    run.result.set({ summary: 'Done' });

    expect(status()).toBe('Finished');
  });
});
