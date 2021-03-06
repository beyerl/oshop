import { AppUser } from './../models/app-user';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  users : AngularFireList<any>;
  userDb = this.db.database.ref('users');

  constructor(private db: AngularFireDatabase) { 
    this.users = this.db.list('/users');
  }

  save(user: firebase.User){
    this.db.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email
    })
  }

  get(uid: string): AngularFireObject<AppUser> {
    return this.db.object('/users/' + uid);
  }
}
