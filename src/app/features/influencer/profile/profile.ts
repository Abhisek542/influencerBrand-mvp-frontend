import { ChangeDetectorRef, Component } from '@angular/core';
import { InfluencerProfile } from '../../../core/models/user.mode';
import { InfluencerService } from '../../../core/services/influencer.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ErrorHandlerService } from '../../../core/services/error-handler.service';

@Component({
  selector: 'app-influencer-profile',
  imports: [CommonModule,FormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  
  profile: InfluencerProfile = {
  bio: '',
  location: '',
  socialLinks: '',
  profilePicture: ''
};

  selectedFile!: File;
  loading = false;

  loadError = '';
  saveError = '';
  uploadError = '';

  constructor(
    private influencerService: InfluencerService,
    private cdr: ChangeDetectorRef,
    private errorHandler: ErrorHandlerService
  ) {}

  ngOnInit() {
    this.loadProfile();
  }

  loadProfile() {
    this.loading = true;
    this.loadError = '';

    this.influencerService.getProfile().subscribe({
      next: (data) => {
        console.log('Profile data:', data);
        this.profile = data;
        this.loading = false;
        this.loadError = '';
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading profile:', err);
        this.loadError = this.errorHandler.getErrorMessage(err);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  saveProfile() {
    this.saveError = '';

    this.influencerService.updateProfile(this.profile).subscribe({
      next: (res) => {
        alert(res.message);
      },
      error: (err) => {
        console.error('Error saving profile:', err);
        this.saveError = this.errorHandler.getErrorMessage(err);
      }
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.uploadError = '';
  }

  uploadProfileImage() {
    this.uploadError = '';

    if (!this.selectedFile) {
      this.uploadError = 'Please select an image first.';
      return;
    }

    this.influencerService.uploadProfileImage(this.selectedFile).subscribe({
      next: (res) => {
        alert(res.message);
        this.loadProfile();
      },
      error: (err) => {
        console.error('Error uploading profile image:', err);
        this.uploadError = this.errorHandler.getErrorMessage(err);
      }
    });
  }
}
