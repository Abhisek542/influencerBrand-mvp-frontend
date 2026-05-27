
 // export const API_SERVER_URL = 'http://localhost:8080';
 export const API_SERVER_URL = "https://influencerhub-backend-hd8t.onrender.com";

 export const API_BASE_URL = `${API_SERVER_URL}/api`;

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

        BRAND_DASHBOARD: `${API_BASE_URL}/dashboard/brand`,
        BRAND_CAMPAIGNS: `${API_BASE_URL}/brand/campaigns`,
        BRAND_APPLICATIONS: `${API_BASE_URL}/brand/applications`,
        VIEW_CAMPAIGN_APPLICATIONS: (campaignId: number) => `${API_BASE_URL}/brand/applications/${campaignId}`,
        DELETE_APPLICATION: (applicationId: number) => `${API_BASE_URL}/brand/applications/${applicationId}/deleted`,
        

    },
    INFLUENCER:{
        DASHBOARD: `${API_BASE_URL}/influencer/dashboard`,
        BROWSE_CAMPAIGNS: `${API_BASE_URL}/influencer/campaigns`,
        APPLY_CAMPAIGN: `${API_BASE_URL}/applications/apply`,
        MY_APPLICATIONS: `${API_BASE_URL}/applications/me`,
        ACCEPTED_CAMPAIGNS: `${API_BASE_URL}/applications/accepted`,
    },
    CAMPAIGN:{

        CREATE: `${API_BASE_URL}/campaign/create`,
        ALL: `${API_BASE_URL}/campaign/all`,
        By_ID: (id: number) => `${API_BASE_URL}/campaign/${id}`,
        MY_CAMPAIGNS: `${API_BASE_URL}/campaign/my-campaigns`,
        DELETE_CAMPAIGN: (id: number) => `${API_BASE_URL}/campaign/delete/${id}`,
        UPDATE_CAMPAIGN: (id: number) => `${API_BASE_URL}/campaign/update/${id}`,
         FILTER_CAMPAIGNS: (params?: any) =>
          `${API_BASE_URL}/campaign/filtr`,

    }
    


 };
