import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';

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

  get(uid: string){
    return this.db.object('/users/' + uid);
  }

  /*add(userData : {name: string, email: string, isAdmin: boolean}) {
    this.userDb.orderByChild('email').equalTo(userData.email)
      .on("value", 
        (snapshot) => {
          if (!snapshot.val()){
            this.users.push(userData)
            .then(() => {
              console.log(userData.name + " added")
            })  
          }
        },
      )
  }*/
}
