import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user = this.afAuth.user;

  constructor(public afAuth: AngularFireAuth) {  }

  login(){
    return this.afAuth.auth.signInWithRedirect(new auth.GoogleAuthProvider());
  }
  logout(){
    return this.afAuth.auth.signOut();
  }
}
