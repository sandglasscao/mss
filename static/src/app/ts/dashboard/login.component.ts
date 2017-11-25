import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {LoginService} from './login.service';
import {User} from "./user";


@Component({
  selector: 'login-form',
  templateUrl: 'static/src/app/templates/dashboard/login.html',
  styleUrls: ['static/src/app/templates/dashboard/login.css'],
  providers: [
    LoginService,
  ]
})


export class LoginComponent {
  user = new User();
  error = null;

  constructor(private loginService: LoginService,
              private router: Router) {
  }

  onSubmit() {
    if (this.user.username) {
      this.loginService
        .login(this.user)
        .then(account => {
          sessionStorage.setItem('token', account.token);
          sessionStorage.setItem('username', this.user.username);
          sessionStorage.setItem('isLogin', '1');
          this.router.navigate(['dashboard']);
        })
        .catch(error => {
          // this.error = error;
          this.error = "密码错误!"
        }); // TODO: Display error message
    }
  }

  cleanerror() {
    this.error = null;
  }
}
