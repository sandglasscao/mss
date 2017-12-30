import {Component, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';

import {RegisterService} from "./register.service";
import "rxjs/add/observable/timer";
import {SMSService} from "./sms.service";

@Component({
  selector: 'app-cellreset',
  templateUrl: '../assets/templates/cellphone-reset.html',
  styleUrls: ['../assets/css/cellphone.css'],
})

export class CellPhoneResetComponent implements OnDestroy {
  cellPhone: string;
  smsCode: string;
  error = null;
  count = 60; //发送间隔
  verifylbl = '发送验证码';
  private timer;

  constructor(private registerService: RegisterService,
              private smsService: SMSService,
              private router: Router) {
  }

  ngOnDestroy(): void {
    if (this.timer)
      clearInterval(this.timer);
  }

  sendSMS() {
    if (this.cellPhone) {
      this.cleanerror();
      let timeOut = Date.now() + this.count * 1000;
      this.timer = setInterval(this.setRemainTime, 1000, timeOut, this.verifylbl);
      document.getElementById('verifybtn').setAttribute('disabled', 'true');
      this.smsService
        .sendSMS(this.cellPhone)
        .then(res => this.error = ('OK' == res.Code) ? null : '频繁获取验证码')
        .catch(error => this.error = error);
    }
  }

  onSubmit() {
    if (this.smsCode) {
      this.smsService
        .verifySMS(this.cellPhone, this.smsCode)
        .then(res => {
          if ('OK' == res.Code) {
            this.registerService
              .cellExist(this.cellPhone)
              .then(res => {
                sessionStorage.setItem('username', res.username);
                sessionStorage.setItem('token', res.token);
                this.router.navigate(['reset-pwd']);
              })
              .catch(error => this.error = "您尚未注册!");
          } else this.error = '验证码错误';
        }).catch()
    } else this.error = "请输入验证码";
  }

  private setRemainTime(timeOut: number, verifylbl: string) {
    let currlbl = verifylbl;
    let currTime = Date.now();
    if (currTime >= timeOut) {
      clearInterval(this.timer);
      document.getElementById('verifybtn').removeAttribute('disabled');
    } else {
      let currCount = Math.round((timeOut - currTime) / 1000);
      currlbl = currCount.toString() + 's后可重发';
    }
    document.getElementById('verifybtn').innerHTML = currlbl;
  }

  cleanerror() {
    this.error = null;
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
