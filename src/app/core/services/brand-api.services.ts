import { Injectable } from "@angular/core";
import { BrandDashboard } from "../models/dashboard.model";
import { HttpClient } from "@angular/common/http";
import { API_ENDPOINTS } from "../constants/api.constants";


@Injectable({    providedIn:'root'
})
export class BrandApiService {
    // Service methods will be implemented here


    constructor(private http: HttpClient) {}

    getBrandDashboard() {
        return this.http.get<BrandDashboard>(API_ENDPOINTS.BRAND.BRAND_DASHBOARD);
    }
    createCampaign(payload: any) { 
        return this.http.post(API_ENDPOINTS.CAMPAIGN.CREATE, payload);
    }
    
}