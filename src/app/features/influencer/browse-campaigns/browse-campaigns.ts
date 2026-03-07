import { ChangeDetectorRef, Component } from '@angular/core';
import { CampaignCard } from '../../../shared/components/campaign-card/campaign-card';
import { InfluencerService } from '../../../core/services/influencer.service';
import { Campaign } from '../../../core/models/campaign.model';
import { EmptyState } from '../../../shared/components/empty-state/empty-state';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-browse-campaigns',
  imports: [EmptyState, CampaignCard,CommonModule,FormsModule],
  templateUrl: './browse-campaigns.html',
  styleUrl: './browse-campaigns.css',
})
export class BrowseCampaigns {

   campaigns: Campaign[] = [];

  loading = false;

  searchTitle = '';
  selectedNiche = '';
  applicationForm = {
  influencerName: '',
  niche: '',
  platform: '',
  message: ''
};

selectedCampaignId: number | null = null;

showApplyModal = false;

  constructor(
    private influencerService: InfluencerService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadCampaigns();
  }

  loadCampaigns() {

    this.loading = true;

    const params: any = {};

    if (this.searchTitle) {
      params.title = this.searchTitle;
    }

    if (this.selectedNiche) {
      params.niche = this.selectedNiche;
    }

    this.influencerService.getCampaigns(params).subscribe({
      next: (data) => {
        console.log('Campaigns data:', data);
        this.campaigns = data.content;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error fetching campaigns:', error);
        this.loading = false;
      }
    });
  }

  openApplyModal(campaignId: number) {
  this.selectedCampaignId = campaignId;
  this.showApplyModal = true;
}
closeApplyModal() {
  this.showApplyModal = false;
}

submitApplication() {

  if (!this.selectedCampaignId) return;

  this.influencerService
    .applyToCampaign(this.selectedCampaignId, this.applicationForm)
    .subscribe({

      next: () => {

        alert("Application submitted");

        this.closeApplyModal();

        this.applicationForm = {
          influencerName: '',
          niche: '',
          platform: '',
          message: ''
        };

      },

      error: (err) => console.error(err)

    });
}

}
