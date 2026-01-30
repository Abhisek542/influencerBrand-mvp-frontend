import { Component } from '@angular/core';
import { CampaignCard } from '../../../shared/components/campaign-card/campaign-card';
import { EmptyState } from '../../../shared/components/empty-state/empty-state';
import { CommonModule } from '@angular/common';

interface AcceptedCampaign {
  id: number;
  title: string;
  brand: string;
  niche: string;
  budget: string;
}
@Component({
  selector: 'app-accepted-campaigns',
  imports: [CampaignCard, EmptyState,CommonModule],
  templateUrl: './accepted-campaigns.html',
  styleUrl: './accepted-campaigns.css',
})
export class AcceptedCampaigns {
  acceptedCampaigns: AcceptedCampaign[] = [
    {
      id: 1,
      title: 'YouTube Product Review',
      brand: 'Boat',
      niche: 'Tech',
      budget: '₹10,000',
    }
  ];
}
