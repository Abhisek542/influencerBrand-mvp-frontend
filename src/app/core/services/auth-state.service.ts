import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { map } from "rxjs/internal/operators/map";


export type userRole = 'BRAND' | 'INFLUENCER';

@Injectable({
    providedIn: 'root'
})
export class AuthStateService {

  // ✅ In-memory only — token, role, and email are never written to
  // localStorage/sessionStorage. JavaScript running on the page (XSS)
  // cannot read values that are never persisted to browser storage.
  private tokenSubject = new BehaviorSubject<string | null>(null);
  private roleSubject  = new BehaviorSubject<userRole | null>(null);
  private emailSubject = new BehaviorSubject<string | null>(null);

  token$ = this.tokenSubject.asObservable();
  role$  = this.roleSubject.asObservable();
  email$ = this.emailSubject.asObservable();

  isLoggedIn$   = this.token$.pipe(map(token => !!token));
  isBrand$      = this.role$.pipe(map(role => role === 'BRAND'));
  isInfluencer$ = this.role$.pipe(map(role => role === 'INFLUENCER'));

  // Previously re-read token/role from localStorage on page load.
  // With in-memory-only storage there is nothing to restore — the user
  // must log in again after a hard refresh (intentional trade-off of
  // Approach 2; use httpOnly cookies + refresh tokens to avoid this).
  initializeAuthState(): void {}

  setAuthState(token: string, role: userRole, email?: string): void {
    // ✅ Only update in-memory subjects — nothing is written to storage
    this.tokenSubject.next(token);
    this.roleSubject.next(role);

    if (email) {
      this.emailSubject.next(email);
    }
  }

  clearAuthState(): void {
    // ✅ Nothing to remove from storage — just reset the in-memory subjects
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