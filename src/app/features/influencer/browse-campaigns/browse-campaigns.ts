import { ChangeDetectorRef, Component } from '@angular/core';
import { CampaignCard } from '../../../shared/components/campaign-card/campaign-card';
import { InfluencerService } from '../../../core/services/influencer.service';
import { Campaign } from '../../../core/models/campaign.model';
import { EmptyState } from '../../../shared/components/empty-state/empty-state';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-browse-campaigns',
  imports: [EmptyState, CampaignCard,CommonModule],
  templateUrl: './browse-campaigns.html',
  styleUrl: './browse-campaigns.css',
})
export class BrowseCampaigns {

  campaigns: Campaign[] = [];

  loading =false;
  constructor(private influencerService: InfluencerService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadCampaigns();
  }

  loadCampaigns() {
    this.loading = true;
    this.influencerService.getCampaigns().subscribe({
    next:(data)=>{
     console.log('Campaigns data:', data);
     this.campaigns = data.content ;
     this.loading = false;
     this.cdr.detectChanges();

    },
    error:(error)=>{
      console.error('Error fetching campaigns:', error);
      this.loading = false;
    }

    });
  }

}
