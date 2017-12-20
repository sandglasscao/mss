import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {LoginService} from './login.service';
import {User} from "./dashboard/user";
import {ProfileService} from "./dashboard/profile.service";

@Component({
  selector: 'app-login',
  templateUrl: '../templates/login.html',
  styleUrls: ['../templates/login.css'],
  providers: [
    LoginService,
  ]
})

export class LoginComponent {
  user = new User();
  next = 'dashboard';
  error: any;

  constructor(private loginService: LoginService,
              private profileService: ProfileService,
              private router: Router) {
  }

  onSubmit() {
    if (this.user.username) {
      this.loginService
        .login(this.user)
        .then(account => {
          sessionStorage.setItem('token', account.token);
          sessionStorage.setItem('username', this.user.username);
          this.routSwitch();
        })
        .catch(error => {
          // this.error = error;
          this.error = "密码错误!"
        }); // TODO: Display error message
    }
  }

  routSwitch() {
    this.profileService
      .getProfile(this.user.username)
      .then(res => {
        this.next = (res.user.is_staff) ? 'console' : 'dashboard';
        let entry = (res.user.is_staff) ? 'console' : 'dashboard';
        sessionStorage.setItem('entry', entry);
        this.router.navigate([this.next]);
      })
      .catch(error => {
        // this.error = error;
        this.error = "业务员不存在!"
      });
  }

  cleanerror() {
    this.error = null;
  }
}
