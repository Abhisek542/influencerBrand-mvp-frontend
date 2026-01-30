import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  username: string = '';
  email: string = ''; 
  password: string = '';

  role:'influencer' | 'brand' = 'influencer';

  submit() {
    // UI-only for now
    console.log('Register form submitted');
  }

}
