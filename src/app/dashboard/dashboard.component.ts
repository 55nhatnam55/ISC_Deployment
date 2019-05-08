import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Admin } from '../services/admin.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  cookieName = '';
  constructor(private router: Router, private authService: AuthService,
              private cookieService: CookieService) { }

  ngOnInit() {
    window.dispatchEvent(new Event('resize'));
    document.body.className = 'hold-transition skin-blue sidebar-mini';
    this.cookieName = this.cookieService.get('fullname');
  }
  ngOnDestroy(): void {
    document.body.className = '';
  }
  logOut() {
    this.authService.setLoggIn(false);
    this.router.navigate(['/login']);
  }
}
