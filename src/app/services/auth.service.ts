import { ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { DbService } from './db.service';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user$: Observable<firebase.User>;

  constructor(public afAuth: AngularFireAuth, public database : AngularFireDatabase,private route: ActivatedRoute) { 
    this.user$ = this.afAuth.authState;
   }

  login(){
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

    this.afAuth.auth.signInWithRedirect(new auth.GoogleAuthProvider());
  }
  logout(){
    this.afAuth.auth.signOut();
  }
  get appUser$(){
    return this.user$.pipe(
      switchMap(user =>
        {
          if (user){
            return this.database.object('/users/'+ user.uid).valueChanges();
          } else{
            return of(null);
          }
        }))
  }
}