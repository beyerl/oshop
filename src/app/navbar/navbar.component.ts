import { DbService } from './../services/db.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { auth } from 'firebase';
import { AppUser } from '../models/app-user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private isNavbarCollapsed = true;

  appUser: AppUser;
  private username : string;
  //private user = this.authService.user;
  
  constructor(public authService: AuthService, private router: Router) {
    authService.appUser$.subscribe(appUser => this.appUser = appUser)
    /*this.user.subscribe(
      (user) => {
        if (user) {
          this.username = this.authService.userData.name;

          this.router.navigate(['']);
        }
      }
    )*/
  }

  ngOnInit() {

  }

  logout(){
    this.authService.logout(); 
    
    this.router.navigate(['login']);
  }
}
