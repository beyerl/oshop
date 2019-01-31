import { DbService } from './../services/db.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { map, switchMap } from 'rxjs/operators';
import * as firebase from 'firebase';
import { AppUser } from '../models/app-user';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService,
    private db: DbService
  ){  }

  canActivate() {
    return this.authService.moshUser$.pipe(
      switchMap(user => this.db.get(user.uid).valueChanges()),
      map(appUser => appUser.isAdmin)
    )
  }

  /*console.log(this.authService.afAuth.auth.currentUser)
    let uid = this.authService.afAuth.auth.currentUser.uid;
    return this.db.get(uid)
    .valueChanges()
    .pipe(map((appUser: AppUser) => appUser.isAdmin));*/

  /*canActivate(): Observable<boolean> {
    return this.authService.moshUser$
      .pipe(
        switchMap(user => {return this.db.get(user.uid).valueChanges()}
        )).pipe*/
    /*console.log("isAdmin: " + this.authService.userData.isAdmin); 
    if (this.authService.userData.isAdmin) {
      return true;
    }
    else {
      this.router.navigate(['']);
      return false
    }*/
  //}
}
