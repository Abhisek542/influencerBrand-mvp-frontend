import { Campaign } from "./campaign.model";

export interface InfluencerDashboard{

    totalApplications: number;
    pending: number;
    accepted: number;
    rejected: number;
    acceptedCampaigns: Campaign[];

}

export interface BrandDashboard{
 
 totalCampaigns: number;
  activeCampaigns: number;
  expiredCampaigns: number;
  totalBudget: number;
  totalApplications: number;
  pendingApplications: number;
  acceptedApplications: number;
    // totalApplications: number; @TODO: to be implemented in future
    // pendingApplications: number; @TODO: to be implemented in future
    // acceptedApplications: number; @TODO: to be implemented in future
  
   

}