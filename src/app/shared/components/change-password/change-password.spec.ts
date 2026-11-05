import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ChangePassword } from './change-password';
import { AuthInterceptor } from '../../../core/interceptors/auth.interceptor';
import { AuthStateService } from '../../../core/services/auth-state.service';

describe('ChangePassword', () => {
  let fixture: ComponentFixture<ChangePassword>;
  let component: ChangePassword;
  let http: HttpTestingController;
  let authState: AuthStateService;
  const form = { resetForm: () => {} } as unknown as NgForm;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangePassword],
      providers: [
        provideRouter([]),
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ChangePassword);
    component = fixture.componentInstance;
    http = TestBed.inject(HttpTestingController);
    authState = TestBed.inject(AuthStateService);
    authState.setAuthState('token', 'INFLUENCER');
    fixture.detectChanges();
  });

  afterEach(() => http.verify());

  function fill(current: string, next: string, confirm = next): void {
    component.currentPassword = current;
    component.newPassword = next;
    component.confirmPassword = confirm;
  }

  function text(): string {
    return (fixture.nativeElement as HTMLElement).textContent ?? '';
  }

  it('sends both passwords with PUT and shows success on 204', () => {
    fill('current-password', 'brand-new-password');
    component.submit(form);

    const request = http.expectOne((r) => r.url.endsWith('/api/user/change-password'));
    expect(request.request.method).toBe('PUT');
    expect(request.request.body).toEqual({
      currentPassword: 'current-password',
      newPassword: 'brand-new-password',
    });
    request.flush(null, { status: 204, statusText: 'No Content' });

    expect(text()).toContain('Your password has been changed.');
    expect(authState.isLoggedIn()).toBe(true);
  });

  it('keeps the session and shows the message when the current password is wrong', () => {
    fill('wrong-password', 'brand-new-password');
    component.submit(form);

    http
      .expectOne((r) => r.url.endsWith('/api/user/change-password'))
      .flush(
        { status: 401, message: 'Current password is incorrect', path: '/api/user/change-password' },
        { status: 401, statusText: 'Unauthorized' }
      );

    expect(text()).toContain('Current password is incorrect');
    expect(text()).not.toContain('Your password has been changed.');
    expect(authState.isLoggedIn()).toBe(true);
  });

  it('ends the session when the token itself is rejected', () => {
    fill('current-password', 'brand-new-password');
    component.submit(form);

    http
      .expectOne((r) => r.url.endsWith('/api/user/change-password'))
      .flush('Invalid Token', { status: 401, statusText: 'Unauthorized' });

    expect(authState.isLoggedIn()).toBe(false);
  });

  it.each([
    ['a short new password', 'current-password', 'short77', 'short77', 'at least 8 characters'],
    ['an over-long new password', 'current-password', 'x'.repeat(73), 'x'.repeat(73), 'too long'],
    ['multi-byte text over the byte limit', 'current-password', '€'.repeat(25), '€'.repeat(25), 'too long'],
    ['mismatched confirmation', 'current-password', 'brand-new-password', 'something-else', 'do not match'],
    ['a missing current password', '', 'brand-new-password', 'brand-new-password', 'current password'],
  ])('does not send a request for %s', (_name, current, next, confirm, message) => {
    fill(current, next, confirm);
    component.submit(form);
    fixture.detectChanges();

    http.expectNone((r) => r.url.endsWith('/api/user/change-password'));
    expect(text()).toContain(message);
  });
});
