import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CampaignCard } from '../../../shared/components/campaign-card/campaign-card';
import { EmptyState } from '../../../shared/components/empty-state/empty-state';
import { CommonModule } from '@angular/common';
import {  RouterLink } from '@angular/router';
import { BrandApiService } from '../../../core/services/brand-api.services';
import { ErrorHandlerService } from '../../../core/services/error-handler.service';

@Component({
  selector: 'app-my-campaigns',
  imports: [CampaignCard,EmptyState,CommonModule,RouterLink],
  templateUrl: './my-campaigns.html',
  styleUrl: './my-campaigns.css',
})



export class MyCampaigns implements OnInit {
 
  campaigns: any[] = [];

  page = 0;
  size = 5;
  totalPages = 0;
  pages: number[] = [];
  loading = false;
  errorMessage = '';

  constructor(
    private brandApi: BrandApiService,
    private cdr: ChangeDetectorRef,
    private errorHandler: ErrorHandlerService
  ) {}

  ngOnInit(): void {
    this.loadCampaigns();
  }

  loadCampaigns(): void {
    this.loading = true;
    this.errorMessage = '';

    this.brandApi.getMyCampaigns(this.page, this.size).subscribe({
      next: (res) => {
        console.log('My Campaigns response:', res);

        this.campaigns = res.content;
        this.totalPages = res.totalPages;
        this.pages = Array.from({ length: this.totalPages }, (_, i) => i);
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading campaigns:', err);
        this.campaigns = [];
        this.totalPages = 0;
        this.pages = [];
        this.errorMessage = this.errorHandler.getErrorMessage(err);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
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


  }

