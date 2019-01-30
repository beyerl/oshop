import { DbService } from './../services/db.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private isNavbarCollapsed = true;

  private isLoggedIn: boolean;
  private user = this.authService.afAuth.user;
  public userData = {name: null, email: null, isAdmin: null}
  
  constructor(public authService: AuthService, private router: Router, private db : DbService) { 
    this.user.subscribe(
      (user) => {
        if (user) {
          this.isLoggedIn = true;

          this.userData.name = user.displayName;
          this.userData.email = user.email;
          this.userData.isAdmin = true;

          db.add(this.userData);

          this.router.navigate(['']);
        }
        else {
          this.isLoggedIn = false;
          this.router.navigate(['login']);
        }
      }     
    )
  }

  ngOnInit() {
  }

  logout(){
    this.authService.logout(); 
    
    this.router.navigate(['login']);
  }
}
