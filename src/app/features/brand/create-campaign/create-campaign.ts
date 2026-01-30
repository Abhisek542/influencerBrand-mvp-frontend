import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-campaign',
  imports: [FormsModule],
  templateUrl: './create-campaign.html',
  styleUrl: './create-campaign.css',
})
export class CreateCampaign {
 campaign = {
    title: '',
    platform: '',
    niche: '',
    budget: null,
    description: '',
 };
 createCampaign() {
    console.log('Campaign created:', this.campaign);

    // MVP behavior: reset form
    this.campaign = {
      title: '',
      platform: '',
      niche: '',
      budget: null,
      description: '',
    };
  }
}
