import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthApiService } from '../../../core/services/auth-api.service';
import { AuthStateService } from '../../../core/services/auth-state.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink,CommonModule,FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  email: string = '';
  password: string = '';

  loading = false;
  error = '';
  justRegistered = false;
  showPassword = false;

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  constructor(
    private router: Router,
    private authApi: AuthApiService,
    private authState: AuthStateService,
    private route: ActivatedRoute  // ✅ added
  ) {
    this.justRegistered = this.route.snapshot.queryParamMap.get('registered') === 'true'; // ✅ added
  }

  login() {
    this.loading = true;
    this.error = '';

    this.authApi.login({ email: this.email, password: this.password }).subscribe({

      next: (res) => {
       this.authState.setAuthState(res.token, res.role, this.email); // ✅ pass email
  this.loading = false;

  if (res.role === 'BRAND') {
    this.router.navigate(['/brand/dashboard']);
  } else if (res.role === 'INFLUENCER') {
    this.router.navigate(['/influencer/dashboard']);
  } else {
    this.error = 'Invalid user role';
  }
      },

      error: (err) => {
        this.error = 'Invalid email or password';
        this.loading = false;
      },

    });
  }

}
