
 export const API_BASE_URL = 'https://localhost:8080/api';

 export const API_ENDPOINTS = {
 
    AUTH: {

        LOGIN: `${API_BASE_URL}/auth/login`,
        REGISTER: `${API_BASE_URL}/auth/register`,
    },

    PROFILE:{

        GET: `${API_BASE_URL}/users/me`,
        UPDATE: `${API_BASE_URL}/users/me`,
        UPLOAD_IMAGE: `${API_BASE_URL}/users/profile-image`,

    },
    BRAND:{

        DASHBOARD: `${API_BASE_URL}/brand/dashboard`,
        CAMPAIGNS: `${API_BASE_URL}/brand/campaigns`,
        CAMPAIGN_BY_ID:(id : number)=> `${API_BASE_URL}/brand/campaigns/${id}`,
        CAMPAIGN_APPLICATIONS:(CampaignId : number)=> `${API_BASE_URL}/brand/campaigns/${CampaignId}/applications`,
        ACCEPT_APPLICATION:(applicationId : number)=> `${API_BASE_URL}/brand/applications/${applicationId}/accept`,
        REJECT_APPLICATION:(applicationId : number)=> `${API_BASE_URL}/brand/applications/${applicationId}/reject`,

    },
    INFLUENCER:{
        DASHBOARD: `${API_BASE_URL}/influencer/dashboard`,
        BROWSE_CAMPAIGNS: `${API_BASE_URL}/influencer/campaigns`,
        APPLY_CAMPAIGN: `${API_BASE_URL}/applications/apply`,
        MY_APPLICATIONS: `${API_BASE_URL}/applications/me`,
        ACCEPTED_CAMPAIGNS: `${API_BASE_URL}/applications/accepted`,
    },
    


 };