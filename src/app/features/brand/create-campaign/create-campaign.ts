import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrandApiService } from '../../../core/services/brand-api.services';
import { ErrorHandlerService } from '../../../core/services/error-handler.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-campaign',
  imports: [FormsModule,CommonModule],
  templateUrl: './create-campaign.html',
  styleUrl: './create-campaign.css',
})
export class CreateCampaign {

  campaign = {
    title: '',
    description: '',
    brandName: '',
    niche: '',
    budget: '',
    deadline: '',
  };

  errorMessage = '';

  constructor(
    private brandApi: BrandApiService,
    private errorHandler: ErrorHandlerService,
    private cdr: ChangeDetectorRef
  ) {}

  createCampaign() {
    this.errorMessage = '';

    console.log('Sending campaign:', this.campaign);

    this.brandApi.createCampaign(this.campaign).subscribe({
      next: (res) => {
        console.log('Campaign created:', res);

        alert('Campaign created successfully ✅');

        this.campaign = {
          title: '',
          description: '',
          brandName: '',
          budget: '',
          niche: '',
          deadline: '',
        };

        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Create Campaign Error:', err);
        console.error('Backend says:', err.error);

        this.errorMessage = this.errorHandler.getErrorMessage(err);
        this.cdr.detectChanges();
      }
    });
  }
}
