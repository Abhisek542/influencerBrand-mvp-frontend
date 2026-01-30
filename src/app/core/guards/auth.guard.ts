import { inject } from "@angular/core";
import { CanActivate, CanActivateFn, Router } from "@angular/router";
import { AuthStateService } from "../services/auth-state.service";


export const authGuard: CanActivateFn =() =>{

const authState = inject(AuthStateService);
const router = inject(Router);

if(!authState.isLoggedIn()){
  router.navigate(['/auth/login']);
  return false;
}
return true;

};

