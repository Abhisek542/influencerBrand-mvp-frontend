export interface Campaign {
    id: number;
    title: string;
    description: string;
    niche: string;
    budget: string;
    deadline: string;
    brandName: string

    applied: boolean; // Indicates if the influencer has applied to this campaign
}