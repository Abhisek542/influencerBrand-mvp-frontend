import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CampaignCard } from '../../../shared/components/campaign-card/campaign-card';
import { EmptyState } from '../../../shared/components/empty-state/empty-state';
import { CommonModule } from '@angular/common';
import {  RouterLink } from '@angular/router';
import { BrandApiService } from '../../../core/services/brand-api.services';

@Component({
  selector: 'app-my-campaigns',
  imports: [CampaignCard,EmptyState,CommonModule,RouterLink],
  templateUrl: './my-campaigns.html',
  styleUrl: './my-campaigns.css',
})



export class MyCampaigns implements OnInit {
 
  campaigns: any[] = []; // This will hold the list of campaigns. Replace 'any' with your actual campaign type.
 
  page=0;
  size=5;
  totalPages=0;;
  loading = true;
  error = '';

  constructor(private brandApi: BrandApiService,  private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadCampaigns();
  }
  
  loadCampaigns(): void {

    this.loading= true;
    this.error = '';

    this.brandApi.getMyCampaigns(this.page,this.size).subscribe({
    
      next:(res)=>{

      console.log('My Campaigns response:', res);

      this.campaigns = res.content; // Assuming the API returns a paginated response with a 'content' field
      this.totalPages = res.totalPages; // Assuming the API returns total pages for pagination
      this.loading = false;
      this.cdr.detectChanges(); 
      
    },
    error:(err)=>{
      console.error('Error loading campaigns:', err);
      this.error = 'Failed to load campaigns';
      this.loading = false;
    }



    });
  }

  nextPage():  void{
    if(this.page+1 <this.totalPages){
    this.page++;
    this.loadCampaigns();

    }
  }

  prevPage(): void{  

    if(this.page>0){

    this.page--;
    this.loadCampaigns();
    }
  }
   

  }

