import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {  RouterLink } from '@angular/router';

@Component({
  selector: 'app-campaign-card',
  imports: [CommonModule,RouterLink],
  templateUrl: './campaign-card.html',
  styleUrl: './campaign-card.css',
})
export class CampaignCard {
   
  @Input() title ='';
  @Input() brand ='';
  @Input() budget='';
    @Input() niche ='';

    @Input() status?: string;

    @Input() showAppications = false;
    @Input() campaignId?:number;
  }
