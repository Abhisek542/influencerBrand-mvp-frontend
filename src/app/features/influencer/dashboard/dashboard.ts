import { ChangeDetectorRef, Component } from '@angular/core';
import { StatCard } from '../../../shared/components/stat-card/stat-card';
import { EmptyState } from '../../../shared/components/empty-state/empty-state';
import { CommonModule } from '@angular/common';
import { CampaignCard } from '../../../shared/components/campaign-card/campaign-card';
import { InfluencerDashboard } from '../../../core/models/dashboard.model';
import { Campaign } from '../../../core/models/campaign.model';
import { InfluencerService } from '../../../core/services/influencer.service';

@Component({
  selector: 'app-dashboard',
  imports: [StatCard,EmptyState,CommonModule,CampaignCard],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

  dashboardStats!: InfluencerDashboard;
  acceptedCampaigns: Campaign[] = [];
  loading = false;

  constructor(private influencerService: InfluencerService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadDashboard();
    this.loadAcceptedCampaigns();
  }

  loadDashboard() {
    this.influencerService.getDashboardData().subscribe({
      next: (data) => {
        this.dashboardStats = data;
      },
      error: (err) => console.error('Error loading dashboard data', err)
    });
  }

  loadAcceptedCampaigns() {
  this.loading = true;

  this.influencerService.getAcceptedCampaigns().subscribe({
    next: (data) => {
      this.acceptedCampaigns = data.map(c => ({
        id: c.id,
        title: c.title,
        description: c.description,
        niche: c.niche,
        budget: `₹${c.budget}`,
        deadline: c.deadline,
        brandName: c.brandName
      }));

      this.loading = false;  // VERY IMPORTANT
      this.cdr.detectChanges();
    },
    error: (err) => {
      console.error(err);
      this.loading = false;  // ALSO IMPORTANT
    }
  });
}
}
