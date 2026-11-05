import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { vi } from 'vitest';

import { AuthStateService } from '../../core/services/auth-state.service';
import { Landing } from './landing';

describe('Landing', () => {
  let fixture: ComponentFixture<Landing>;
  let page: HTMLElement;

  beforeEach(async () => {
    vi.useFakeTimers();
    await TestBed.configureTestingModule({
      imports: [Landing],
      providers: [provideRouter([])],
    }).compileComponents();
    fixture = TestBed.createComponent(Landing);
    fixture.detectChanges();
    page = fixture.nativeElement;
  });

  afterEach(() => vi.useRealTimers());

  function finishExample(): void {
    vi.advanceTimersByTime(10000);
    fixture.detectChanges();
  }

  it('lists every agent with its skills and what it asks before doing', () => {
    expect(page.querySelectorAll('article.agent').length).toBe(3);
    expect(page.textContent).toContain('Flag injection attempts');
    expect(page.textContent).toContain('Asks you before submitting the application');
  });

  it('labels the run as an example and pauses it for a decision', () => {
    expect(page.textContent).toContain('Example run');
    expect(page.querySelector('.gate')).toBeNull();

    finishExample();

    expect(page.querySelector('.run-status')?.textContent).toContain('Waiting for your decision');
    expect(page.querySelector('.gate-note')?.textContent).toContain('change nothing');
  });

  it('finishes the example only after approval', () => {
    finishExample();
    page.querySelector<HTMLButtonElement>('.gate-actions .btn-mint')!.click();
    fixture.detectChanges();

    expect(page.querySelector('.run-status')?.textContent).toContain('Finished');
    expect(page.querySelector('.gate-actions')).toBeNull();
  });

  it('offers sign-up to visitors and the workspace to signed-in users', () => {
    expect(page.querySelector('a[href="/auth/register"]')).not.toBeNull();

    TestBed.inject(AuthStateService).setAuthState('token', 'BRAND', 'brand@demo.test');
    const signedIn = TestBed.createComponent(Landing);
    signedIn.detectChanges();

    expect(signedIn.nativeElement.querySelector('a[href="/brand/dashboard"]')).not.toBeNull();
    expect(signedIn.nativeElement.querySelector('a[href="/auth/register"]')).toBeNull();
  });
});
