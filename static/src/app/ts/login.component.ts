import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {LoginService} from './login.service';
import {Profile} from './profile';


@Component({
  selector: 'login-form',
  templateUrl: 'static/src/app/templates/login.html',
  providers: [
    LoginService,
  ]
})


export class LoginComponent {
  model = new Profile();
  error = null;

  constructor(private loginService: LoginService,
              private router: Router) {
  }

  onSubmit() {
    if (this.model.username) {
      this.loginService
        .login(this.model)
        .then(profile => {
          sessionStorage.setItem('token', profile.token);
          sessionStorage.setItem('account', this.model.username);
          this.router.navigate(['/dashboard']);
        })
        .catch(error => {
          // this.error = error;
          this.error = "用户编码或密码错误!"
        }); // TODO: Display error message
    }
  }

  cleanerror() {
    this.error = null;
  }
}
