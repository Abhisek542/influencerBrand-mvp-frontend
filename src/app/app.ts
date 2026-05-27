import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthStateService } from './core/services/auth-state.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('influencer-hub');

  constructor(private auth: AuthStateService) {}

  ngOnInit(): void {
    // Remove any token/role/email that may have been left in localStorage
    // by a previous version of the app. We no longer use localStorage for
    // auth state — everything is in-memory only.
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('email');

    this.auth.initializeAuthState();
  }
}
