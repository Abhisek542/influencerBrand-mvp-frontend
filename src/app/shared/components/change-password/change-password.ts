import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthApiService } from '../../../core/services/auth-api.service';
import { ErrorHandlerService } from '../../../core/services/error-handler.service';

const MIN_PASSWORD_CHARACTERS = 8;
const MAX_PASSWORD_BYTES = 72;

@Component({
  selector: 'app-change-password',
  imports: [CommonModule, FormsModule],
  templateUrl: './change-password.html',
  styleUrl: './change-password.css',
})
export class ChangePassword {
  currentPassword = '';
  newPassword = '';
  confirmPassword = '';

  saving = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private authApi: AuthApiService,
    private errorHandler: ErrorHandlerService,
    private cdr: ChangeDetectorRef
  ) {}

  submit(form: NgForm): void {
    this.errorMessage = '';
    this.successMessage = '';

    const problem = this.findProblem();
    if (problem) {
      this.errorMessage = problem;
      return;
    }

    this.saving = true;
    this.authApi
      .changePassword({ currentPassword: this.currentPassword, newPassword: this.newPassword })
      .subscribe({
        next: () => {
          this.saving = false;
          this.successMessage = 'Your password has been changed.';
          form.resetForm();
          this.cdr.detectChanges();
        },
        error: (err) => {
          this.saving = false;
          this.errorMessage = this.errorHandler.getErrorMessage(err);
          this.cdr.detectChanges();
        },
      });
  }

  private findProblem(): string {
    if (!this.currentPassword) {
      return 'Enter your current password.';
    }
    if ((this.newPassword ?? '').length < MIN_PASSWORD_CHARACTERS) {
      return `New password must be at least ${MIN_PASSWORD_CHARACTERS} characters.`;
    }
    if (new TextEncoder().encode(this.newPassword).length > MAX_PASSWORD_BYTES) {
      return 'New password is too long.';
    }
    if (this.newPassword !== this.confirmPassword) {
      return 'The new passwords do not match.';
    }
    return '';
  }
}
