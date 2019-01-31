import { AuthService } from './services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DbService } from './services/db.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private dbService: DbService, private authService: AuthService, router: Router) {
    authService.moshUser$.subscribe(user => {
      if(user) {
        dbService.save(user);

        let returnUrl = localStorage.getItem('returnUrl');
        router.navigateByUrl(returnUrl);
      }
    })
  }
}
