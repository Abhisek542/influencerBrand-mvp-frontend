import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { ChangePasswordRequest, LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from "../models/auth.model";
import { Observable } from "rxjs";
import { API_ENDPOINTS } from "../constants/api.constants";



@Injectable({    providedIn: 'root' })
export class AuthApiService {

 constructor(private http: HttpClient) {  }

    login(payload: LoginRequest): Observable<LoginResponse>{

        return this.http.post<LoginResponse>(API_ENDPOINTS.AUTH.LOGIN, payload);

    }

   register(payload: RegisterRequest): Observable<RegisterResponse> {
  return this.http.post<RegisterResponse>(API_ENDPOINTS.AUTH.REGISTER, payload);
  }

    changePassword(payload: ChangePasswordRequest): Observable<void> {
        return this.http.put<void>(API_ENDPOINTS.USER.CHANGE_PASSWORD, payload);
    }
    
}
