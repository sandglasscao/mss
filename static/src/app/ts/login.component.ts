import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {LoginService} from './login.service';
import {User} from "./dashboard/user";
import {ProfileService} from "./dashboard/profile.service";

@Component({
  selector: 'app-login',
  templateUrl: 'static/src/app/templates/login.html',
  styleUrls: ['static/src/app/templates/login.css'],
  providers: [
    LoginService,
  ]
})

export class LoginComponent implements OnInit {
  user = new User();
  next = 'dashboard';
  error = null;

  constructor(private loginService: LoginService,
              private profileService: ProfileService,
              private router: Router) {
  }

  ngOnInit(): void {
    if (sessionStorage.getItem('isLogin')) {
      let next = sessionStorage.getItem('entry');
      this.router.navigate([next]);
    }
  }

  onSubmit() {
    if (this.user.username) {
      this.loginService
        .login(this.user)
        .then(account => {
          sessionStorage.setItem('token', account.token);
          sessionStorage.setItem('username', this.user.username);
          sessionStorage.setItem('isLogin', '1');
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
