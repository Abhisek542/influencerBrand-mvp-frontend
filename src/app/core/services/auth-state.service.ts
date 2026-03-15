import { Inject, Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { map } from "rxjs/internal/operators/map";


export type userRole= 'BRAND' | 'INFLUENCER';

@Injectable({
    providedIn: 'root'
})
export class AuthStateService {

 private tokenSubject = new BehaviorSubject<string | null>(localStorage.getItem('token'));
  private roleSubject = new BehaviorSubject<userRole | null>(localStorage.getItem('role') as userRole | null);
  private emailSubject = new BehaviorSubject<string | null>(localStorage.getItem('email'));

  token$ = this.tokenSubject.asObservable();
  role$ = this.roleSubject.asObservable();
  email$ = this.emailSubject.asObservable();

  isLoggedIn$ = this.token$.pipe(map(token => !!token));
  isBrand$ = this.role$.pipe(map(role => role === 'BRAND'));
  isInfluencer$ = this.role$.pipe(map(role => role === 'INFLUENCER'));

  initializeAuthState(): void {
    this.tokenSubject.next(localStorage.getItem('token'));
    this.roleSubject.next(localStorage.getItem('role') as userRole | null);
    this.emailSubject.next(localStorage.getItem('email'));
  }

  setAuthState(token: string, role: userRole, email?: string): void {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);

    if (email) {
      localStorage.setItem('email', email);
      this.emailSubject.next(email);
    }

    this.tokenSubject.next(token);
    this.roleSubject.next(role);
  }

  clearAuthState(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('email');

    this.tokenSubject.next(null);
    this.roleSubject.next(null);
    this.emailSubject.next(null);
  }

  getToken(): string | null {
    return this.tokenSubject.value;
  }

  getRole(): userRole | null {
    return this.roleSubject.value;
  }

  getEmail(): string | null {
    return this.emailSubject.value;
  }

  isLoggedIn(): boolean {
    return !!this.tokenSubject.value;
  }

  isBrand(): boolean {
    return this.roleSubject.value === 'BRAND';
  }

  isInfluencer(): boolean {
    return this.roleSubject.value === 'INFLUENCER';
  }
}