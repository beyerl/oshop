import { ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { DbService } from './db.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user = this.afAuth.user;
  public userData = {name: null, email: null, isAdmin: null};
  //public isLoggedIn = false;
  public moshUser$: Observable<firebase.User>;

  constructor(public afAuth: AngularFireAuth, private db : DbService, private route: ActivatedRoute) { 
    this.moshUser$ = this.afAuth.authState;

    /*this.user
    .subscribe(
      (user) => {
        if (user) {
          this.userData.name = user.displayName;
          this.userData.email = user.email;
          this.userData.isAdmin = true;

          db.add(this.userData);
        }
      }
    )*/

    /*this.afAuth.authState
    .subscribe(
      (user) => {      
        if (user && user.uid){
          console.log("isLoggedIn: " + this.isLoggedIn)
          this.isLoggedIn = true;
        }
        else {
          console.log("isLoggedIn: "  + this.isLoggedIn)
          this.isLoggedIn = false; 
        }
      }
    )*/
   }

  login(){
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

    this.afAuth.auth.signInWithRedirect(new auth.GoogleAuthProvider());
  }
  logout(){
    this.afAuth.auth.signOut();
  }
}