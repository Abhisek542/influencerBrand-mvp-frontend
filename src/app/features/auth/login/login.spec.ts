import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

import { Login } from './login';

describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;
  let http: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Login],
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    })
    .compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    http = TestBed.inject(HttpTestingController);
    await fixture.whenStable();
  });

  afterEach(() => http.verify());

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders the error banner and re-enables the form after a 401', () => {
    fixture.detectChanges();
    component.email = 'user@example.test';
    component.password = 'wrong-password';

    component.login();
    http
      .expectOne((r) => r.url.endsWith('/api/auth/login'))
      .flush({ status: 401, message: 'Invalid email or password' }, { status: 401, statusText: 'Unauthorized' });

    const page = fixture.nativeElement as HTMLElement;
    expect(page.querySelector('.login-error')?.textContent).toContain('Invalid email or password');
    expect(page.querySelector('.login-btn')?.textContent).not.toContain('Signing in');
  });
});
