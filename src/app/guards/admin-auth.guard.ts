import { DbService } from './../services/db.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { map, switchMap } from 'rxjs/operators';
import * as firebase from 'firebase';
import { AppUser } from '../models/app-user';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
  ){  }

  canActivate() {
    return this.authService.user$.pipe(
      switchMap(user =>
        {
          if (user){
            return this.authService.database.object('/users/'+ user.uid).valueChanges();
          } else{
            return of(null);
          }
        }
       ),
      map(appUser => appUser.isAdmin)
    )
  }
}
