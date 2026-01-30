
export interface USerProfile{

    id: number;
    Username: string;
    email: string;
    role: 'BRAND' | 'INFLUENCER';
    profileImageUrl?: string;
}