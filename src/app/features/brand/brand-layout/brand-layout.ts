import { Component } from '@angular/core';
import {   RouterLink, RouterOutlet } from '@angular/router';
import { Sidebar } from '../../../shared/components/sidebar/sidebar';

@Component({
  selector: 'app-brand-layout',
  imports: [RouterOutlet,Sidebar],
  templateUrl: './brand-layout.html',
  styleUrl: './brand-layout.css',
})
export class BrandLayout {
  menu = [
  { label: 'Dashboard', route: 'dashboard', icon: '📊' },
  { label: 'Create Campaign', route: 'campaigns/create', icon: '➕' },
  { label: 'My Campaigns', route: 'campaigns', icon: '📁' },
  
];


}

