import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate(route, state: RouterStateSnapshot){
    return this.authService.moshUser$.pipe(
      map(user => {
        if (user) return true;
  
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
      }));
    /*if (this.authService.isLoggedIn) return true;

    this.router.navigate(['/login']);
    return false;*/
  }
}
