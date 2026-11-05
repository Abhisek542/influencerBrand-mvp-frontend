import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthStateService } from '../../../core/services/auth-state.service';
import { Mascot } from '../mascot/mascot';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, CommonModule, Mascot],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  constructor(private router: Router, private authState: AuthStateService) {}

  @Input() menu: { label: string; route: string; icon: string; agent?: boolean }[] = [];
  @Input() portal = 'Portal';
  @Input() username = 'User';
  @Input() email = '';
  @Input() isOpen = false;
  @Output() closed = new EventEmitter<void>();

  get agentItems() {
    return this.menu.filter((item) => item.agent);
  }

  get workspaceItems() {
    return this.menu.filter((item) => !item.agent);
  }

  close() {
    this.closed.emit();
  }

  logout() {
    this.authState.clearAuthState();
    this.router.navigate(['/auth/login']);
  }
}
