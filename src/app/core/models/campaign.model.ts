export interface Campaign {
    id: number;
    title: string;
    description: string;
    niche: string;
    budget: string;
    deadline: string;
    brandName?: string;
    status?: 'ACTIVE' |'EXPIRED';
}