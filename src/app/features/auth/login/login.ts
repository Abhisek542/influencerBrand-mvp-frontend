import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
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
error='';

constructor(private router: Router, private authApi: AuthApiService, private authState: AuthStateService) { }

login(){

  this.loading = true;
  this.error='';

  this.authApi.login({email: this.email, password: this.password}).subscribe({

 next: (res) => {

   this.authState.setAuth(res.token, res.role);

   if(res.role === 'BRAND'){
     this.router.navigate(['/brand/dashboard']);
   } else{

     this.router.navigate(['/influencer/dashboard']);
   }
   this.loading = false;
  },

 error: (err) => {
   this.error ='Invalid email or password';
   this.loading = false;
  },
});
}


}
