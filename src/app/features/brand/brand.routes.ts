import { Routes } from '@angular/router';


import { Dashboard } from './dashboard/dashboard';
import { CreateCampaign } from './create-campaign/create-campaign';
import { MyCampaigns } from './my-campaigns/my-campaigns';
import { CampaignApplications } from './campaign-applications/campaign-applications';
import { Profile } from './profile/profile';
import { BrandLayout } from './brand-layout/brand-layout';
import { BrandAiAgents } from './ai-agents/ai-agents';

export const BRAND_ROUTES: Routes = [
  {
    path: '',
    component: BrandLayout,
    children: [
      {
        path: 'dashboard',
        component: Dashboard,
      },
      {
        path: 'campaigns/create',
        component: CreateCampaign,
      },
      {
        path: 'campaigns',
        component: MyCampaigns,
      },
      {
        path: 'applications/:id',
        component: CampaignApplications,
      },
      {
        path: 'ai-agents',
        component: BrandAiAgents,
      },
      {
        path: 'profile',
        component: Profile,
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },
];
