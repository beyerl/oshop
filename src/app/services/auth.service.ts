import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { DbService } from './db.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user = this.afAuth.user;
  public userData = {name: null, email: null, isAdmin: null};
  public isLoggedIn = false;

  constructor(public afAuth: AngularFireAuth, private db : DbService) { 
    this.user
    .subscribe(
      (user) => {
        if (user) {
          this.userData.name = user.displayName;
          this.userData.email = user.email;
          this.userData.isAdmin = true;

          db.add(this.userData);
        }
      }
    )

    this.afAuth.authState
    .subscribe(
      (response) => {
        if (response && response.uid){
          console.log("isLoggedIn: " + this.isLoggedIn)
          this.isLoggedIn = true;
        }
        else {
          console.log("isLoggedIn: "  + this.isLoggedIn)
          this.isLoggedIn = false; 
        }
      }
    )
   }

  login(){
    return this.afAuth.auth.signInWithRedirect(new auth.GoogleAuthProvider());
  }
  logout(){
    return this.afAuth.auth.signOut();
  }


}
