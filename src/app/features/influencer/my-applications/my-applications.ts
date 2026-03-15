import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmptyState } from '../../../shared/components/empty-state/empty-state';
import { MyApplicationCard } from '../my-application-card/my-application-card';
import { InfluencerApplication } from '../../../core/models/application.model';
import { InfluencerService } from '../../../core/services/influencer.service';
import { ErrorHandlerService } from '../../../core/services/error-handler.service';

@Component({
  selector: 'app-my-applications',
  imports: [CommonModule,EmptyState,MyApplicationCard],
  templateUrl: './my-applications.html',
  styleUrl: './my-applications.css',
})
export class MyApplications {
  
  applications: InfluencerApplication[] = [];
  loading= false;
  errorMessage = '';

  constructor(private influencerService: InfluencerService,private cdr: ChangeDetectorRef, private errorhandler: ErrorHandlerService) {}

  ngOnInit() {
    this.loadApplications();
  }

  loadApplications() {

    this.loading = true;
    this.influencerService.getMyApplications().subscribe({
      next: (data) => {
        console.log('Applications loaded:', data);
        this.applications = data;
        this.loading = false;
         this.cdr.detectChanges();
        
      },
      
      error: (err) =>{
          console.error('Error loading applications:', err);
          this.errorMessage = this.errorhandler.getErrorMessage(err);
          this.loading = false;
          this.cdr.detectChanges();
        }

    });
  }
}
