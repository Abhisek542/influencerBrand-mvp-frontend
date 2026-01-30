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
    totalApplications: number;
    totalbudget: number;
    pendingApplications: number;
    acceptedApplications: number;

}