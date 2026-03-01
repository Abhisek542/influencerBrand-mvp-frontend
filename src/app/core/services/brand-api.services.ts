import { Injectable } from "@angular/core";
import { BrandDashboard } from "../models/dashboard.model";
import { HttpClient } from "@angular/common/http";
import { API_BASE_URL, API_ENDPOINTS } from "../constants/api.constants";


@Injectable({    providedIn:'root'
})
export class BrandApiService {
    // Service methods will be implemented here


    constructor(private http: HttpClient) {}

    getBrandDashboard() {
        return this.http.get<BrandDashboard>(API_ENDPOINTS.BRAND.BRAND_DASHBOARD);
    }
    
    createCampaign(campaignData: any) {
        return this.http.post(API_ENDPOINTS.CAMPAIGN.CREATE, campaignData,{ responseType: 'text' });
    }
    getMyCampaigns(page=0,size=5) {
        return this.http.get<any>(`${API_ENDPOINTS.CAMPAIGN.MY_CAMPAIGNS}?page=${page}&size=${size}`

        );
    }
    getCampaignApplications(campaignId: number){
        return this.http.get<any>(`${API_ENDPOINTS.BRAND.BRAND_APPLICATIONS}?campaignId=${campaignId}`);
    }
    getApplicationsForCampaign(campaignId: number) {
  return this.http.get<any[]>(API_ENDPOINTS.BRAND.VIEW_CAMPAIGN_APPLICATIONS(campaignId));
}
 updateApplicationStatus(applicationId: number, status: string) {
  return this.http.post(
    `${API_BASE_URL}/brand/applications/${applicationId}/status?status=${status}`,
    {},
    { responseType: 'text' }
  );
}
 deleteCampaignApplication(applicationId: number) {
    return this.http.delete(API_ENDPOINTS.BRAND.DELETE_APPLICATION(applicationId),{responseType:'text'});
 }
}

