import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { StatCard } from '../../../shared/components/stat-card/stat-card';
import { EmptyState } from '../../../shared/components/empty-state/empty-state';
import { CommonModule } from '@angular/common';
import { BrandDashboard } from '../../../core/models/dashboard.model';
import { BrandApiService } from '../../../core/services/brand-api.services';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [StatCard, EmptyState, CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  
  dashboard?: BrandDashboard;
  loading = true;
  error = '';

  constructor(
    private brandApi: BrandApiService,
    private cdr: ChangeDetectorRef // ✅ Injected for manual change detection
  ) {}

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard(): void {
    this.loading = true;
    this.error = '';

    this.brandApi.getBrandDashboard().subscribe({
      next: (res) => {
        console.log('Dashboard response:', res);
        this.dashboard = res;
        this.loading = false;
        
        // ✅ Tell Angular to update the UI immediately
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        console.error('Dashboard error:', err);
        this.error = 'Failed to load dashboard data. Please try again later.';
        this.loading = false;
        
        // ✅ Ensure error state renders
        this.cdr.detectChanges(); 
      }
    });
  }
}