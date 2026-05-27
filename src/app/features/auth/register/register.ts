import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthApiService } from '../../../core/services/auth-api.service';
import { AuthStateService } from '../../../core/services/auth-state.service';
import { ErrorHandlerService } from '../../../core/services/error-handler.service';
import { RegisterRequest, RegisterResponse } from '../../../core/models/auth.model';
import { SuccessModal } from '../../../shared/components/success-modal/success-modal';

@Component({
  selector: 'app-register',
  imports: [CommonModule,FormsModule,RouterLink, SuccessModal],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

   username = '';
  email = '';
  password = '';
  role: 'BRAND' | 'INFLUENCER' | '' = '';

  loading = false;
  errorMessage = '';
  showSuccessModal = false;
  showPassword = false;

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  constructor(
    private authApi: AuthApiService,
    private authState: AuthStateService,
    private errorHandler: ErrorHandlerService,
    private router: Router,
    private ngZone: NgZone
  ) {}

  submit() {
    this.loading = true;
    this.errorMessage = '';
    const payload: RegisterRequest = {
      name: this.username,
      email: this.email,
      password: this.password,
      role: this.role as 'BRAND' | 'INFLUENCER'
    };
    this.authApi.register(payload).subscribe({

      next: (res: RegisterResponse) => {
         setTimeout(() => {
    this.loading = false;
    if (!res.success) {
      this.errorMessage = res.message;
      return;
    }
    // skip modal, just redirect
    this.router.navigate(['/auth/login'], {
      queryParams: { registered: 'true' }
    });
  }, 0);
      },

      error: (err) => {
         console.error('Got error:', err);
         this.loading = false;
          try {
            this.errorMessage = this.errorHandler.getErrorMessage(err);
          } catch (e) {
            this.errorMessage = 'Something went wrong. Please try again.';
            console.error('ErrorHandler crashed:', e);
          }
        
      }

    });
  }

  onModalConfirm() {
    this.showSuccessModal = false;
    this.router.navigate(['/auth/login']);
  }


}
