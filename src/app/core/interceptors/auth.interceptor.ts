import { Injectable } from "@angular/core";
import { AuthStateService } from "../services/auth-state.service";
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Router } from "@angular/router";
import { catchError, Observable, throwError } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

 
  constructor(
    private authState: AuthStateService,
    private router: Router
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    const isAuthRequest =
      req.url.includes('/api/auth/login') ||
      req.url.includes('/api/auth/register');

    let authReq = req;

    const token = this.authState.getToken();

    if (token && !isAuthRequest) {
      authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {

        if (error.status === 401) {
          this.authState.clearAuthState();
          this.router.navigate(['/auth/login']);
        }

        return throwError(() => error);
      })
    );
  }
}