import { ChangeDetectorRef, Component } from '@angular/core';
import { CampaignCard } from '../../../shared/components/campaign-card/campaign-card';
import { EmptyState } from '../../../shared/components/empty-state/empty-state';
import { CommonModule } from '@angular/common';
import { Campaign } from '../../../core/models/campaign.model';
import { InfluencerService } from '../../../core/services/influencer.service';

@Component({
  selector: 'app-accepted-campaigns',
  imports: [CampaignCard, EmptyState,CommonModule],
  templateUrl: './accepted-campaigns.html',
  styleUrl: './accepted-campaigns.css',
})
export class AcceptedCampaigns {
 
  acceptedCampaigns : Campaign[] = [];
  loading = false;

  constructor(private influencerService: InfluencerService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadAcceptedCampaigns();
  }

  loadAcceptedCampaigns() {
   
    this.influencerService.getAcceptedCampaigns().subscribe({
      next: (data) => {

        console.log('Raw accepted campaigns data:', data); // Debug log
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
        this.cdr.detectChanges();
      }

    });

  }
}
