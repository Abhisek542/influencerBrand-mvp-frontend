import { TestBed } from '@angular/core/testing';
import { HTTP_INTERCEPTORS, HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Router, provideRouter } from '@angular/router';
import { vi } from 'vitest';
import { AuthInterceptor } from './auth.interceptor';
import { AuthStateService } from '../services/auth-state.service';
import { API_BASE_URL, API_ENDPOINTS } from '../constants/api.constants';

describe('AuthInterceptor', () => {
  let client: HttpClient;
  let http: HttpTestingController;
  let authState: AuthStateService;
  let navigate: ReturnType<typeof vi.spyOn>;
  const unauthorized = { status: 401, statusText: 'Unauthorized' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
      ],
    });
    client = TestBed.inject(HttpClient);
    http = TestBed.inject(HttpTestingController);
    authState = TestBed.inject(AuthStateService);
    navigate = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    authState.setAuthState('token', 'BRAND');
  });

  afterEach(() => http.verify());

  function request(url: string) {
    client.get(url).subscribe({ next: () => {}, error: () => {} });
    return http.expectOne(url);
  }

  it('attaches the token to API requests', () => {
    const call = request(`${API_BASE_URL}/campaign/my-campaigns`);
    expect(call.request.headers.get('Authorization')).toBe('Bearer token');
    call.flush({});
  });

  it('logs out on a 401 from a normal API route', () => {
    request(`${API_BASE_URL}/campaign/my-campaigns`).flush('Invalid Token', unauthorized);

    expect(authState.isLoggedIn()).toBe(false);
    expect(navigate).toHaveBeenCalledWith(['/auth/login']);
  });

  it('does not log out or navigate on a failed login', () => {
    request(API_ENDPOINTS.AUTH.LOGIN).flush({ status: 401, message: 'Invalid email or password' }, unauthorized);

    expect(navigate).not.toHaveBeenCalled();
  });

  it('keeps the session when change-password reports a wrong current password', () => {
    request(API_ENDPOINTS.USER.CHANGE_PASSWORD).flush(
      { status: 401, message: 'Current password is incorrect' },
      unauthorized
    );

    expect(authState.isLoggedIn()).toBe(true);
    expect(navigate).not.toHaveBeenCalled();
  });

  it('logs out when change-password is rejected for an expired token', () => {
    request(API_ENDPOINTS.USER.CHANGE_PASSWORD).flush('Invalid Token', unauthorized);

    expect(authState.isLoggedIn()).toBe(false);
    expect(navigate).toHaveBeenCalledWith(['/auth/login']);
  });

  it('does not log out on a 403', () => {
    request(`${API_BASE_URL}/campaign/delete/1`).flush(
      { status: 403, message: 'Access denied' },
      { status: 403, statusText: 'Forbidden' }
    );

    expect(authState.isLoggedIn()).toBe(true);
  });
});
