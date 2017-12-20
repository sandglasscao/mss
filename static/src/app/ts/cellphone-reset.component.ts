import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {User} from './dashboard/user';
import {RegisterService} from "./registrater.service";
import {timer} from "rxjs/observable/timer";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/timer";

@Component({
  selector: 'app-cellreset',
  templateUrl: '../templates/cellphone-reset.html',
  styleUrls: ['../templates/cellphone.css'],
})

export class CellPhoneResetComponent {
  user = new User();
  cellPhone: string;
  smsCode: string;
  verification: any;
  error: any;
  smslbl = "发送验证码";

  constructor(private registerService: RegisterService,
              private router: Router) {
    //this.timer = Observable.timer(0, 1000);
  }


  getSMS() {
    //this.timer.subscribe(t => this.theValue += 1);
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
