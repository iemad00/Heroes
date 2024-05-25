import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const requiresAuth = next.data['requiresAuth'];

    if (requiresAuth && !this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      this.toastr.error("Unauthorized!");
      return false;
    }

    if (!requiresAuth && this.authService.isAuthenticated()) {
      this.router.navigate(['/heroes']);
      return false;
    }

    return true;
  }

}
