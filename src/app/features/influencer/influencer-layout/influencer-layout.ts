import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Sidebar } from '../../../shared/components/sidebar/sidebar';
import { AuthStateService } from '../../../core/services/auth-state.service';

@Component({
  selector: 'app-influencer-layout',
  imports: [RouterOutlet,Sidebar],
  templateUrl: './influencer-layout.html',
  styleUrl: './influencer-layout.css',
})
export class InfluencerLayout {

  menu = [
  { label: 'Dashboard', route: 'dashboard', icon: '📊' },
  { label: 'Browse Campaigns', route: 'browse-campaigns', icon: '🧭' },
  { label: 'My Applications', route: 'my-applications', icon: '📄' },
  { label: 'Accepted', route: 'accepted-campaigns', icon: '✅' },
  { label: 'Profile', route: 'profile', icon: '👤' },
];

constructor(private authState: AuthStateService) {}
username='User';
email='';

ngOnInit() {
    const email = this.authState.getEmail();
    console.log('InfluencerLayout initialized with email:', email);
    if (email) {
      this.email = email;
      this.username = email.split('@')[0]; // "ann" from "ann@gmail.com"
    }

}

}