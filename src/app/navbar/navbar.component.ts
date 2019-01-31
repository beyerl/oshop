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
export class NavbarComponent {
  private isNavbarCollapsed = true;

  appUser: AppUser;
  
  constructor(public authService: AuthService, private router: Router) {
    authService.appUser$.subscribe(appUser => this.appUser = appUser)
  }

  logout(){
    this.authService.logout(); 
    
    this.router.navigate(['login']);
  }
}
