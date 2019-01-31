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
  constructor(private db: DbService, private authService: AuthService, router: Router) {
    authService.user$.subscribe(user => {
      if(user) {
        db.save(user);

        let returnUrl = localStorage.getItem('returnUrl');
        if (returnUrl) router.navigateByUrl(returnUrl);
        localStorage.setItem('returnUrl', '');
      }
    })
  }
}
