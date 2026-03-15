import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_BASE_URL } from "../constants/api.constants";
import { InfluencerDashboard } from "../models/dashboard.model";
import { Campaign } from "../models/campaign.model";
import { InfluencerApplication } from "../models/application.model";
import { Observable } from "rxjs";
import { PageResponse } from "../models/page-response.model";
import { InfluencerProfile } from "../models/user.mode";
import { formatDate } from "@angular/common";

@Injectable({ providedIn: 'root' })
export class InfluencerService {

private baseUrl =`${API_BASE_URL}/influencers`; // Replace with actual API base URL
constructor(private http:HttpClient) {}

getDashboardData() {

    return this.http.get<InfluencerDashboard>(`${this.baseUrl}/mydashboard`);
}
getAcceptedCampaigns() {

    return this.http.get<Campaign[]>(`${this.baseUrl}/accepted`);



}
getMyApplications(){
    return this.http.get<InfluencerApplication[]>(`${this.baseUrl}/my-applications`);
}
getCampaigns(params?: any): Observable<PageResponse<Campaign>> {
  return this.http.get<PageResponse<Campaign>>(
    `${API_BASE_URL}/campaign/filtr`,
    { params }
  );
}
applyToCampaign(campaignId: number, application: any) {
  return this.http.post<{message: string}>(
    `${API_BASE_URL}/influencer/apply/${campaignId}`,
    application
  );
}
getProfile(){
   return this.http.get<InfluencerProfile>(`${API_BASE_URL}/influencer/profile/me`);
}
updateProfile(profile: InfluencerProfile){
    return this.http.post<{message: string}>(`${API_BASE_URL}/influencer/profile/update`, profile);
}

uploadProfileImage(file: File) {

  const formData = new FormData();
  formData.append('file', file);

  return this.http.post<{ message: string }>(`${API_BASE_URL}/influencer/profile/upload-image`, formData);
}
  
}