import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from '../../../shared/components/sidebar/sidebar';
import { AuthStateService } from '../../../core/services/auth-state.service';

@Component({
  selector: 'app-brand-layout',
  imports: [RouterOutlet, Sidebar],
  templateUrl: './brand-layout.html',
  styleUrl: './brand-layout.css',
})
export class BrandLayout {
  menu = [
    { label: 'Dashboard', route: 'dashboard', icon: '📊' },
    { label: 'Create Campaign', route: 'campaigns/create', icon: '➕' },
    { label: 'My Campaigns', route: 'campaigns', icon: '📁' },
  ];

  constructor(private authState: AuthStateService) {}

  username = 'User';
  email = '';
  sidebarOpen = false;

  ngOnInit() {
    const email = this.authState.getEmail();
    if (email) {
      this.email = email;
      this.username = email.split('@')[0];
    }
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  closeSidebar() {
    this.sidebarOpen = false;
  }
}
