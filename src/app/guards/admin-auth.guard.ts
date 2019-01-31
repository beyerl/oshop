import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService
  ){  }

  canActivate() {
    console.log("isAdmin: " + this.authService.userData.isAdmin); 
    if (this.authService.userData.isAdmin) {
      return true;
    }
    else {
      this.router.navigate(['']);
      return false
    }
  }
}
