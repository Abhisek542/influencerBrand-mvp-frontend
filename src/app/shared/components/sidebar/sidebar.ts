import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthStateService } from '../../../core/services/auth-state.service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  constructor(private router: Router, private authState: AuthStateService) {}

  @Input() menu: { label: string; route: string; icon: string }[] = [];
  @Input() portal = 'Portal';
  @Input() username = 'User';
  @Input() email = '';
  @Input() isOpen = false;
  @Output() closed = new EventEmitter<void>();

  close() {
    this.closed.emit();
  }

  logout() {
    this.authState.clearAuthState();
    this.router.navigate(['/auth/login']);
  }
}
