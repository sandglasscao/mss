import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {LoginService} from './login.service';
import {User} from "./user";


@Component({
  selector: 'login-form',
  templateUrl: 'static/src/app/templates/login.html',
  providers: [
    LoginService,
  ]
})


export class LoginComponent {
  model = new User();
  error = null;

  constructor(private loginService: LoginService,
              private router: Router) {
  }

  onSubmit() {
    if (this.model.username) {
      this.loginService
        .login(this.model)
        .then(account => {
          sessionStorage.setItem('token', account.token);
          sessionStorage.setItem('username', account.username);
          sessionStorage.setItem('isLogin', 'true');
          this.router.navigate(['/dashboard']);
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
