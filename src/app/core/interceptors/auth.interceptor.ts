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

    let authReq = req;

    // 🔐 Attach token if logged in
    if (this.authState.isLoggedIn()) {
      const token = localStorage.getItem('token');

      authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {

        // 🚨 Handle Unauthorized globally
        if (error.status === 401) {
          this.authState.clearAuth();
          this.router.navigate(['/auth/login']);
        }

        return throwError(() => error);
      })
    );
  }
}