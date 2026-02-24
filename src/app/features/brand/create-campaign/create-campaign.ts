import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrandApiService } from '../../../core/services/brand-api.services';

@Component({
  selector: 'app-create-campaign',
  imports: [FormsModule],
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

constructor(private brandApi: BrandApiService) {}
 createCampaign() {

  console.log('Sending campaign:', this.campaign);

  this.brandApi.createCampaign(this.campaign).subscribe({

    next: (res) => {
      console.log('Campaign created:', res);

      alert('Campaign created successfully ✅');

      // Reset form (MVP behaviour)
      this.campaign = {
        title: '',
        description: '',
        brandName: '',
        budget: '',
        niche: '',
        deadline: '',
      };
    },

    error: (err) => {
     console.error('Create Campaign Error:', err);
   console.error('Backend says:', err.error);   // ⭐ ADD THIS
  alert('Failed to create campaign ❌');
    }

  });
}
}
