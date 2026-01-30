import { Inject, Injectable } from "@angular/core";


export type userRole= 'BRAND' | 'INFLUENCER';

@Injectable({
    providedIn: 'root'
})
export class AuthStateService {

    private readonly TOKEN_KEY = 'token';
    private readonly ROLE_KEY = 'role';

    isLoggedIn(): boolean {
        return !!localStorage.getItem(this.TOKEN_KEY);
    }
    getRole(): userRole | null {
        return localStorage.getItem(this.ROLE_KEY) as userRole | null;
    }

    setAuth(token: string , role: userRole): void {
        localStorage.setItem(this.TOKEN_KEY, token);
        localStorage.setItem(this.ROLE_KEY, role);
    }
    clearAuth(): void {
        localStorage.removeItem(this.TOKEN_KEY);
        localStorage.removeItem(this.ROLE_KEY);
    }
    isBrand(): boolean {
        return this.getRole() === 'BRAND';
    }
    isInfluencer(): boolean {   
        return this.getRole() === 'INFLUENCER';
    }
}