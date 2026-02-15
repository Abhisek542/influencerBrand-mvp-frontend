import { Component, OnInit } from '@angular/core';
import { StatCard } from '../../../shared/components/stat-card/stat-card';
import { EmptyState } from '../../../shared/components/empty-state/empty-state';
import { CommonModule } from '@angular/common';
import { BrandDashboard } from '../../../core/models/dashboard.model';
import { BrandApiService } from '../../../core/services/brand-api.services';

@Component({
  selector: 'app-dashboard',
  imports: [StatCard,EmptyState,CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
   
 dashboard?: BrandDashboard;
 loading= true;
 error='';
  constructor(private brandApi: BrandApiService) {}

  ngOnInit(): void {
    
    this.brandApi.getBrandDashboard().subscribe({

     next:(res)=>{

       console.log('Dashboard response:', res); 
       console.log('Component instance:', this);
      this.dashboard = res;
      this.loading = false;
     },
     
     error:()=>{
     
      this.error = 'Failed to load dashboard data. Please try again later.';
      this.loading = false;

     },

    } );
  
  }

}
