import {Component, OnInit} from '@angular/core';
import {ProfileService} from './dashboard/profile.service';
import {User} from './dashboard/user';
import {Router} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'reset-pwd',
  templateUrl: '../assets/templates/dashboard/password.html',
  styleUrls: ['../assets/css/dashboard/password.css']
})
export class PasswordResetComponent implements OnInit {
  user = new User();
  second_pwd = null;
  error = null;

  constructor(private profileService: ProfileService,
              private router: Router,
              private location: Location) {
  }

  ngOnInit(): void {
    this.user.username = sessionStorage.getItem('username');
  }

  back() {
    this.router.navigate(['../']);
  }

  goBack(): void {
    this.location.back();
  }

  onSubmit() {
    if (this.checkPwd()) {
      this.profileService
        .changePwd(this.user)
        .subscribe(
          data => this.back(),
          error => this.error = "密码错误!"
        );
    }
  }

  checkPwd(): boolean {
    this.error = (this.user.password != this.second_pwd) ? "密码不一致,请重新输入" : null;
    return (!this.error);
  }

  cleanerror() {
    this.error = null;
  }
}


