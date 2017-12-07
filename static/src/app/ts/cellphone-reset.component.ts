import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {User} from './dashboard/user';
import {RegisterService} from "./registrater.service";

@Component({
  selector: 'app-cellreset',
  templateUrl: 'static/src/app/templates/dashboard/cellphone-reset.html',
  styleUrls: ['static/src/app/templates/dashboard/cellphone.css'],
})

export class CellPhoneResetComponent {
  user = new User();
  cellPhone: string;
  smsCode: string;
  verification = null;
  error = null;

  constructor(private registerService: RegisterService,
              private router: Router) {
  }

  getSMS() {
    /*if (this.cellPhone) {
      this.registerService
        .checkCell(this.cellPhone)
        .catch(error => {
          // this.error = error;
          this.error = "验证码服务超时!"
        }); // TODO: Display error message
    }*/
    this.verification = '1234'; // for debugging register functions
  }

  onSubmit() {
    if (this.smsCode == this.verification) {
      if (this.cellPhone) {
        this.registerService
          .cellExist(this.cellPhone)
          .then(res => {
            sessionStorage.setItem('username', res.username);
            sessionStorage.setItem('token', res.token);
            this.router.navigate(['reset-pwd']);
          })
          .catch(error => {
            // this.error = error;
            this.error = "您尚未注册!"
          }); // TODO: Display error message
      } else {
        this.error = "验证未通过";
      }
    } else {
      this.error = "验证码错误";
    }
  }

  cleanerror() {
    this.error = null;
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
