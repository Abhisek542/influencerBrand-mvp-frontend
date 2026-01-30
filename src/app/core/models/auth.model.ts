
export interface LoginRequest{
    email: string;
    password: string;
}
export interface LoginResponse{
    token: string;
    role: 'BRAND' | 'INFLUENCER';
}
export interface RegisterRequest{
    name: string;
    email: string;
    password: string;
    role: 'BRAND' | 'INFLUENCER';
}
export interface RegisterResponse{

    message: string;
}