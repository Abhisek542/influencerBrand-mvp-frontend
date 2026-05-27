import { ChangeDetectorRef, Component, HostListener } from '@angular/core';
import { CampaignCard } from '../../../shared/components/campaign-card/campaign-card';
import { InfluencerService } from '../../../core/services/influencer.service';
import { Campaign } from '../../../core/models/campaign.model';
import { EmptyState } from '../../../shared/components/empty-state/empty-state';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ErrorHandlerService } from '../../../core/services/error-handler.service';

@Component({
  selector: 'app-browse-campaigns',
  imports: [EmptyState, CampaignCard,CommonModule,FormsModule],
  templateUrl: './browse-campaigns.html',
  styleUrl: './browse-campaigns.css',
})
export class BrowseCampaigns {

  campaigns: Campaign[] = [];

  loading = false;

  page = 0;
  size = 10;
  totalPages = 0;
  pages: number[] = [];

  searchTitle = '';
  selectedNiche = '';

  showApplyModal = false;
  selectedCampaignId: number | null = null;

  applicationForm = {
    influencerName: '',
    niche: '',
    platform: '',
    message: ''
  };

  errorMessage = '';
  successMessage = '';

  constructor(
    private influencerService: InfluencerService,
    private cdr: ChangeDetectorRef,
    private errorhandler: ErrorHandlerService
  ) {}

  ngOnInit() {
    this.loadCampaigns();
  }

 loadCampaigns() {
  this.loading = true;
  this.errorMessage = '';

  const params: any = {
    page: this.page,
    size: this.size
  };

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
      this.totalPages = data.totalPages;
      this.pages = Array.from({ length: this.totalPages }, (_, i) => i);

      this.errorMessage = '';
      this.loading = false;
      this.cdr.detectChanges();
    },

    error: (error) => {
      console.error('Error fetching campaigns:', error);

      this.campaigns = [];
      this.totalPages = 0;
      this.pages = [];
      this.errorMessage = this.errorhandler.getErrorMessage(error);
      this.loading = false;
      this.cdr.detectChanges();
    }
  });
}

  onSearchChange() {

    this.page = 0;
    this.loadCampaigns();

  }

  onFilterChange() {

    this.page = 0;
    this.loadCampaigns();

  }

  nextPage() {

    if (this.page < this.totalPages - 1) {
      this.page++;
      this.loadCampaigns();
      this.cdr.detectChanges();
    }

  }

  prevPage() {

    if (this.page > 0) {
      this.page--;
      this.loadCampaigns();
       this.cdr.detectChanges();
    }

  }

  goToPage(p: number) {

    this.page = p;
    this.loadCampaigns();
     this.cdr.detectChanges();

  }

  isApplicationFormValid(): boolean {
    return !!(
      this.applicationForm.influencerName.trim() &&
      this.applicationForm.platform &&
      this.applicationForm.niche &&
      this.applicationForm.message.trim()
    );
  }

  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    if (this.showApplyModal) {
      this.closeApplyModal();
    }
  }

  openApplyModal(campaignId: number) {
    this.selectedCampaignId = campaignId;
    this.successMessage = '';
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

        next: (res) => {

          if (res.message === "Application has been applied") {
            this.successMessage = 'Your application was submitted successfully!';
            this.closeApplyModal();

            const campaign = this.campaigns.find(c => c.id === this.selectedCampaignId);
           if (campaign) {
            campaign.applied = true;
            this.cdr.detectChanges(); // trigger UI update
            }
              
            

            this.applicationForm = {
              influencerName: '',
              niche: '',
              platform: '',
              message: ''
            };

          }

        },

        error: (err) =>{
          console.error('Error applying to campaign:', err);
          this.errorMessage = this.errorhandler.getErrorMessage(err);
          this.loading = false;
        }

      });

  }

}
