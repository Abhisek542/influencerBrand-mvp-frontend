import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmptyState } from '../../../shared/components/empty-state/empty-state';
import { BrandApiService } from '../../../core/services/brand-api.services';

@Component({
  selector: 'app-campaign-applications',
  imports: [CommonModule,EmptyState],
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
    });
  }

  reject(app: any) {
    this.brandApi.updateApplicationStatus(app.id, 'REJECTED').subscribe(() => {
      app.status = 'REJECTED';
    });
  }
}