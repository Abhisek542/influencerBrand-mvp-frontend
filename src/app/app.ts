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
    this.auth.initializeAuthState();
  }
}
