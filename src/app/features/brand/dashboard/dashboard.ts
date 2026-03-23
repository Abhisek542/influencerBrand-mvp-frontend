import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { StatCard } from '../../../shared/components/stat-card/stat-card';
import { EmptyState } from '../../../shared/components/empty-state/empty-state';
import { CommonModule } from '@angular/common';
import { BrandDashboard } from '../../../core/models/dashboard.model';
import { BrandApiService } from '../../../core/services/brand-api.services';
import { ErrorHandlerService } from '../../../core/services/error-handler.service';
import { CampaignCard } from '../../../shared/components/campaign-card/campaign-card';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [StatCard, EmptyState, CommonModule, CampaignCard],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  
 dashboard?: BrandDashboard;
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
    this.loadDashboard();
    this.loadCampaigns();
  }

  loadDashboard(): void {
    this.loading = true;
    this.errorMessage = '';

    this.brandApi.getBrandDashboard().subscribe({
      next: (res) => {
        console.log('Dashboard response:', res);
        this.dashboard = res;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Dashboard error:', err);
        this.dashboard = undefined;
        this.errorMessage = this.errorHandler.getErrorMessage(err);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  loadCampaigns(): void {
    this.loading =true;
      this.errorMessage = '';
      this.brandApi.getMyCampaigns(0, 5).subscribe({
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