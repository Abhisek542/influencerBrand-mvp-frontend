import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
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
  successMessage = '';

  constructor(
    private brandApi: BrandApiService,
    private errorHandler: ErrorHandlerService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  cancel(): void {
    this.router.navigate(['/brand/campaigns']);
  }

  createCampaign() {
    this.errorMessage = '';
    this.successMessage = '';

    this.brandApi.createCampaign(this.campaign).subscribe({
      next: (res) => {
        this.successMessage = 'Campaign created successfully!';
        this.errorMessage = '';
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
        this.errorMessage = this.errorHandler.getErrorMessage(err);
        this.successMessage = '';
        this.cdr.detectChanges();
      }
    });
  }
}
