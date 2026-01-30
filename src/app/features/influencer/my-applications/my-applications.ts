import { Component } from '@angular/core';
import { CampaignCard } from '../../../shared/components/campaign-card/campaign-card';
import { CommonModule } from '@angular/common';
import { EmptyState } from '../../../shared/components/empty-state/empty-state';
import { MyApplicationCard } from '../my-application-card/my-application-card';

interface Application {
  id: number;
  title: string;
  brand: string;
  niche: string;
  budget: string;
  status: 'Pending' | 'Accepted' | 'Rejected';
}
@Component({
  selector: 'app-my-applications',
  imports: [CommonModule,EmptyState,MyApplicationCard],
  templateUrl: './my-applications.html',
  styleUrl: './my-applications.css',
})
export class MyApplications {
   applications: Application[] = [
    {
      id: 1,
      title: 'Instagram Reel Promotion',
      brand: 'Nike',
      niche: 'Fitness',
      budget: '₹5,000',
      status: 'Pending',
    },
    {
      id: 2,
      title: 'YouTube Product Review',
      brand: 'Boat',
      niche: 'Tech',
      budget: '₹10,000',
      status: 'Accepted',
    }
  ];
}
