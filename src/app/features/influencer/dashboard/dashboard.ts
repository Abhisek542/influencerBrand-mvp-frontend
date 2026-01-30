import { Component } from '@angular/core';
import { StatCard } from '../../../shared/components/stat-card/stat-card';
import { EmptyState } from '../../../shared/components/empty-state/empty-state';
import { CommonModule } from '@angular/common';
import { CampaignCard } from '../../../shared/components/campaign-card/campaign-card';

@Component({
  selector: 'app-dashboard',
  imports: [StatCard,EmptyState,CommonModule,CampaignCard],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
   
  acceptedCampaigns = [
  {
    id: 1,
    title: 'YouTube Product Review',
    brand: 'Boat',
    niche: 'Tech',
    budget: '₹10,000',
  }
];
}
