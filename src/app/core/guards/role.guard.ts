import { ActivatedRoute, ActivatedRouteSnapshot, ActivatedRouteSnapshot, CanActivateFn, Router } from "@angular/router";
import { AuthStateService, userRole } from "../services/auth-state.service";
import { inject } from "@angular/core/primitives/di";


export const roleGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot
) => {
  const authState = inject(AuthStateService);
  const router = inject(Router);

  const allowedRoles = route.data['roles'] as userRole[];

  const userRole = authState.getRole();

  // ❌ Not logged in or role mismatch
  if (!userRole || !allowedRoles.includes(userRole)) {
    router.navigate(['/auth/login']);
    return false;
  }

  return true;
};