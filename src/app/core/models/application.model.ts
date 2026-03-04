export type ApplicationStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED';

export interface CampaignApplication {

    id: number;
    campaignId: number;
    campaignTitle: string;
    brandName: string;
    influencerName?: string;
    message: string;
    status: ApplicationStatus;
    appliedOn: string; // ISO date string
    platform?: string;
    niche?: string;

}
export interface InfluencerApplication {

    campaignId: number;
    campaignTitle: string;
    brandName: string;
    message: string;
    status: ApplicationStatus;
    deadline: string; // ISO date string
}