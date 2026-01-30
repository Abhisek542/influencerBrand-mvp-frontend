import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmptyState } from '../../../shared/components/empty-state/empty-state';

@Component({
  selector: 'app-campaign-applications',
  imports: [CommonModule,EmptyState],
  templateUrl: './campaign-applications.html',
  styleUrl: './campaign-applications.css',
})
export class CampaignApplications {

 campaignId!: number;
 applications = [
    {
      id: 1,
      campaignId: 1,
      name: 'Abhisek Bose',
      niche: 'Tech',
      platform: 'YouTube',
      status: 'PENDING',
    },
    {
      id: 2,
      campaignId: 2,
      name: 'Rahul Sharma',
      niche: 'Fitness',
      platform: 'Instagram',
      status: 'PENDING',
    },
    {
      id: 3,
      campaignId: 1,
      name: 'Ankit Verma',
      niche: 'Tech',
      platform: 'Instagram',
      status: 'PENDING',
    },
  ];

  filteredApplications: any[] = [];
  constructor(private route: ActivatedRoute) {}

  ngOnInit(){
    this.campaignId = Number(this.route.snapshot.paramMap.get('id'));
    this.filteredApplications = this.applications.filter(app => app.campaignId === this.campaignId);
  }
  
  accept(app:any){
    app.status = 'ACCEPTED';
  }
  
  reject(app:any){
    app.status = 'REJECTED';
  }

  

}
