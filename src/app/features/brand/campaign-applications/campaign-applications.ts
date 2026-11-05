import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EmptyState } from '../../../shared/components/empty-state/empty-state';
import { BrandApiService } from '../../../core/services/brand-api.services';
import { ErrorHandlerService } from '../../../core/services/error-handler.service';

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
  loadError = '';
  actionError = '';

  constructor(
    private route: ActivatedRoute,
    private brandApi: BrandApiService,
    private cdr: ChangeDetectorRef,
    private errorHandler: ErrorHandlerService
  ) {}

  ngOnInit(): void {
    this.campaignId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadApplications();
  }

  loadApplications(): void {
    this.loading = true;
    this.loadError = '';

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
        this.loadError = this.errorHandler.getErrorMessage(err);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  accept(app: any) {
    this.updateStatus(app, 'ACCEPTED');
  }

  reject(app: any) {
    this.updateStatus(app, 'REJECTED');
  }

  // The badge only changes after a successful response, so a refused request never looks like a success.
  private updateStatus(app: any, status: 'ACCEPTED' | 'REJECTED') {
    this.actionError = '';

    this.brandApi.updateApplicationStatus(app.id, status).subscribe({
      next: () => {
        app.status = status;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.actionError = this.errorHandler.getErrorMessage(err);
        this.cdr.detectChanges();
      }
    });
  }

 delete(app: any) {
  if (!confirm('Are you sure you want to delete this application?')) {
    return;
  }

  this.actionError = '';

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
      this.actionError = this.errorHandler.getErrorMessage(err);
      this.cdr.detectChanges();
    }
  });
}
}