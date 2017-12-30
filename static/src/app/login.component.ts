import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {LoginService} from './login.service';
import {User} from "./dashboard/user";
import {ProfileService} from "./dashboard/profile.service";

@Component({
  selector: 'app-login',
  templateUrl: '../assets/templates/login.html',
  styleUrls: ['../assets/css/login.css'],
  providers: [
    LoginService,
  ]
})

export class LoginComponent {
  user = new User();
  next = 'dashboard';
  error = null;

  constructor(private loginService: LoginService,
              private profileService: ProfileService,
              private router: Router) {
  }

  onSubmit() {
    if (this.user.username) {
      this.loginService
        .login(this.user)
        .subscribe(
          data => {
            sessionStorage.setItem('token', data.token);
            sessionStorage.setItem('username', this.user.username);
            this.routSwitch();
          },
          error => this.error = "密码错误!"
        );
    }
  }

  routSwitch() {
    this.profileService
      .getProfile(this.user.username)
      .subscribe(
        data => {
          this.next = (data.user.is_staff) ? 'console' : 'dashboard';
          let entry = (data.user.is_staff) ? 'console' : 'dashboard';
          sessionStorage.setItem('entry', entry);
          this.router.navigate([this.next]);
        },
        error => this.error = "业务员不存在!");
  }

  cleanerror() {
    this.error = null;
  }
}
