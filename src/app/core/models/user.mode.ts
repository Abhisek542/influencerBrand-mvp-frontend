
export interface USerProfile{

    id: number;
    Username: string;
    email: string;
    role: 'BRAND' | 'INFLUENCER';
    profileImageUrl?: string;
}

export interface InfluencerProfile{

    bio: string;
    location: string;
    socialLinks: string;
    profilePicture: string;
}