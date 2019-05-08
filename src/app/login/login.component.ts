import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

declare var $;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  message = '';
  username = '';
  password = '';
  constructor(private authService: AuthService, private cookieService: CookieService,
              private router: Router, private loginService: LoginService) {}
  ngOnInit() {
    document.body.className = 'hold-transition login-page';
    $(() => {
      $('input').iCheck({
        checkboxClass: 'icheckbox_square-blue',
        radioClass: 'iradio_square-blue',
        increaseArea: '20%' /* optional */
      });
    });
  }
  login() {
    this.loginService.login(this.username, this.password)
    .subscribe(result => {
      if (result.errorCode === 1) {
        this.message = result.message;
        // console.log(result, this.message);
      } else {
        this.message = '';
        this.authService.setLoggIn(true);
        //console.log(result.data);
        // save cookie
        this.cookieService.set('adminid', result.data.adminid + '');
        this.cookieService.set('username', result.data.username);
        this.cookieService.set('password', result.data.password);
        this.cookieService.set('fullname', result.data.fullname);
        this.cookieService.set('token', result.data.token);
        this.router.navigate(['/course']);
      }
    });
  }
}
