import { Component } from '@angular/core';
import { CampaignCard } from '../../../shared/components/campaign-card/campaign-card';
import { EmptyState } from '../../../shared/components/empty-state/empty-state';
import { CommonModule } from '@angular/common';
import {  RouterLink } from '@angular/router';

@Component({
  selector: 'app-my-campaigns',
  imports: [CampaignCard,EmptyState,CommonModule,RouterLink],
  templateUrl: './my-campaigns.html',
  styleUrl: './my-campaigns.css',
})



export class MyCampaigns {
 
  campaigns: Campaign[] = [
    {
      id: 1,
      title: 'Instagram Reel Promotion',
      brand: 'Nike',
      niche: 'Fitness',
      budget: '₹5,000',
      status: 'Pending'
    },
    {
      id: 2,
      title: 'YouTube Product Review',
      brand: 'Boat',
      niche: 'Tech',
      budget: '₹10,000',
      status: 'Pending'
    }
  ];
}

interface Campaign {
  id: number;
  title: string;
  brand: string;
  niche: string;
  budget: string;
  status: string;
}