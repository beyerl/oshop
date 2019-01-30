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
  public user = this.authService.afAuth.user;
  
  constructor(public authService: AuthService, private router: Router) { 
    this.user.subscribe(
      (user) => {
        if (user) {
          this.isLoggedIn = true;
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
