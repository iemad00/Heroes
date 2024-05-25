import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';

export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const toastr = inject(ToastrService);
  const router = inject(Router);

  const requiresAuth = route.data['requiresAuth'];

  if (requiresAuth && !authService.isAuthenticated()) {
    router.navigate(['/login']);
    toastr.error("Unauthorized!");
    return false;
  }

  if (!requiresAuth && authService.isAuthenticated()) {
    router.navigate(['/heroes']);
    return false;
  }

  return true;
};
