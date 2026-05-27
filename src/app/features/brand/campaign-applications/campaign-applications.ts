import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EmptyState } from '../../../shared/components/empty-state/empty-state';
import { BrandApiService } from '../../../core/services/brand-api.services';

@Component({
  selector: 'app-campaign-applications',
  imports: [CommonModule, EmptyState, RouterLink],
  templateUrl: './campaign-applications.html',
  styleUrl: './campaign-applications.css',
})
export class CampaignApplications {

  campaignId!: number;

  applications: any[] = [];
  filteredApplications: any[] = [];

  loading = true;

  constructor(
    private route: ActivatedRoute,
    private brandApi: BrandApiService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.campaignId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadApplications();
  }

  loadApplications(): void {
    this.loading = true;

    this.brandApi.getApplicationsForCampaign(this.campaignId).subscribe({
      next: (res) => {
        console.log('Applications:', res);

        this.applications = res;
        this.filteredApplications = res;

        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  accept(app: any) {
    this.brandApi.updateApplicationStatus(app.id, 'ACCEPTED').subscribe(() => {
      
      app.status = 'ACCEPTED';
      this.cdr.detectChanges();
    });
  }

  reject(app: any) {
    this.brandApi.updateApplicationStatus(app.id, 'REJECTED').subscribe(() => {
      app.status = 'REJECTED';
    });
  }
 delete(app: any) {
  if (!confirm('Are you sure you want to delete this application?')) {
    return;
  }

  this.brandApi.deleteCampaignApplication(app.id).subscribe({
    next: () => {
      // 1. Update the local data
      this.applications = this.applications.filter(a => a.id !== app.id);
      this.filteredApplications = [...this.applications]; // Use spread to trigger reference change

      // 2. Tell Angular to check for changes
      this.cdr.detectChanges();
      
      console.log('Application removed from UI');
    },
    error: (err) => {
      console.error('Delete failed:', err);
      // show inline error on the card in a future iteration
    }
  });
}
}