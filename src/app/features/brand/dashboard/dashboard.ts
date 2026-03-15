import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { StatCard } from '../../../shared/components/stat-card/stat-card';
import { EmptyState } from '../../../shared/components/empty-state/empty-state';
import { CommonModule } from '@angular/common';
import { BrandDashboard } from '../../../core/models/dashboard.model';
import { BrandApiService } from '../../../core/services/brand-api.services';
import { ErrorHandlerService } from '../../../core/services/error-handler.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [StatCard, EmptyState, CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  
 dashboard?: BrandDashboard;
  loading = false;
  errorMessage = '';

  constructor(
    private brandApi: BrandApiService,
    private cdr: ChangeDetectorRef,
    private errorHandler: ErrorHandlerService
  ) {}

  ngOnInit(): void {
    this.loadDashboard();
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
}