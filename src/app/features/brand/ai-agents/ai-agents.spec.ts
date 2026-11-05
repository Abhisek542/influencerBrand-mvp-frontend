import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { vi } from 'vitest';

import { BrandApiService } from '../../../core/services/brand-api.services';
import { BrandAiAgents } from './ai-agents';

function evaluation(id: number, name: string, proposed: string, score: number | null, flags: string[] = []) {
  return {
    application_id: id,
    applicant_name: name,
    niche: 'Fitness',
    platform: 'Instagram',
    message: 'I make home workouts',
    score,
    label: score === null ? 'INSUFFICIENT_EVIDENCE' : 'STRONG_MATCH',
    proposed_action: proposed,
    flags,
    evidence_quotes: [],
    strengths: [],
    concerns: [],
    missing_information: [],
    outreach_draft: null,
    criteria: [
      { name: 'NICHE_RELEVANCE', score: 100, method: 'exact match', weight: 35 },
      { name: 'APPLICATION_RELEVANCE', score: score === null ? null : 80, method: 'local AI', weight: 40 },
    ],
  };
}

describe('BrandAiAgents shortlist review', () => {
  let fixture: ComponentFixture<BrandAiAgents>;
  let component: BrandAiAgents;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrandAiAgents],
      providers: [
        provideRouter([]),
        { provide: BrandApiService, useValue: { getMyCampaigns: () => of({ content: [{ id: 1, title: 'Launch' }] }) } },
      ],
    });
    fixture = TestBed.createComponent(BrandAiAgents);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function pause(...evaluations: any[]) {
    const payload = { evaluations, limitations: ['No follower data'], advisory: 'AI-generated' };
    component.prepareDecisions(payload);
    component.shortlist.pending.set(payload);
    fixture.detectChanges();
  }

  function decide(applicationId: number, decision: 'ACCEPT' | 'REJECT' | 'SKIP') {
    component.decisions[applicationId] = decision;
    fixture.componentRef.changeDetectorRef.markForCheck();
    fixture.detectChanges();
  }

  const el = (selector: string): HTMLElement => fixture.nativeElement.querySelector(selector);
  const approve = () => el('.gate .actions button') as HTMLButtonElement;

  it('sums up the proposals and shows limits before the applicants', () => {
    pause(evaluation(1, 'Aarav', 'ACCEPT', 89), evaluation(2, 'Sana', 'HOLD', null));

    expect(el('.results h2').textContent).toContain('The AI proposes 1 decision and leaves 1 to you');
    const limits = el('.limits');
    expect(limits.textContent).toContain('No follower data');
    expect(limits.compareDocumentPosition(el('.applicants')) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('starts every decision undecided, whatever the AI suggests', () => {
    pause(evaluation(1, 'Aarav', 'ACCEPT', 89), evaluation(2, 'Rohan', 'REJECT', 10), evaluation(3, 'Sana', 'HOLD', null));

    expect(Object.values(component.decisions)).toEqual(['SKIP', 'SKIP', 'SKIP']);
    expect(el('.gate h2').textContent).toContain('No changes selected');
    expect(approve().disabled).toBe(true);
    expect(el('.applicant .suggest-cell').textContent).toContain('Accept');
  });

  it('names exactly what approval will do, following the current choices', () => {
    pause(evaluation(1, 'Aarav', 'ACCEPT', 89), evaluation(2, 'Rohan', 'REJECT', 10), evaluation(3, 'Sana', 'HOLD', null));
    decide(1, 'ACCEPT');
    decide(2, 'REJECT');

    expect(el('.changes').textContent).toContain('Accept Aarav');
    expect(el('.changes').textContent).toContain('Reject Rohan');
    expect(el('.gate').textContent).toContain('Stay pending: Sana');
    expect(approve().textContent).toContain('Approve 2 changes');

    decide(2, 'SKIP');
    expect(el('.changes').textContent).not.toContain('Rohan');
    expect(approve().textContent).toContain('Approve 1 change');
  });

  it('explains why approval is unavailable when nothing is selected', () => {
    pause(evaluation(1, 'Sana', 'HOLD', null));

    expect(el('.gate h2').textContent).toContain('No changes selected');
    expect(approve().disabled).toBe(true);
  });

  it('discards a review by answering with no decisions', () => {
    const answer = vi.spyOn(component.shortlist, 'answer').mockImplementation(() => {});
    pause(evaluation(1, 'Aarav', 'ACCEPT', 89));

    (el('.gate .actions button.secondary') as HTMLButtonElement).click();

    expect(answer).toHaveBeenCalledWith({ decisions: [] });
    expect(component.discarded()).toBe(true);
  });

  it('blocks a new review while one is waiting, so decisions are not lost', () => {
    pause(evaluation(1, 'Aarav', 'ACCEPT', 89));

    expect((el('.panel .actions button') as HTMLButtonElement).disabled).toBe(true);
  });

  it('shows the criteria behind a score and never ranks an unscored applicant', () => {
    pause(evaluation(1, 'Aarav', 'ACCEPT', 89), evaluation(2, 'Sana', 'HOLD', null));

    const items: HTMLElement[] = Array.from(fixture.nativeElement.querySelectorAll('.applicant'));
    expect(items[0].querySelector('.rank')!.textContent).toBe('1');
    expect(items[0].querySelector('.criteria')!.textContent).toContain('Niche match');
    expect(items[0].querySelector('.criteria')!.textContent).toContain('80 / 100');
    expect(items[1].querySelector('.rank')!.textContent).toBe('');
    expect(items[1].querySelector('.criteria')!.textContent).toContain('Not enough data');
  });

  it('keeps flags visible while details stay collapsed', () => {
    pause(evaluation(1, 'Aarav', 'ACCEPT', 89), evaluation(2, 'Vikram', 'HOLD', 11, ['Tried to instruct the AI']));

    const details: HTMLDetailsElement[] = Array.from(fixture.nativeElement.querySelectorAll('details'));
    expect(details.every((d) => !d.open)).toBe(true);
    expect(el('.applicant:nth-child(2) > .warning').textContent).toContain('Tried to instruct the AI');
  });
});
