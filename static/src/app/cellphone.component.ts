import {Component, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';

import {SMSService} from "./sms.service";


@Component({
  selector: 'app-cell',
  templateUrl: '../assets/templates/cellphone.html',
  styleUrls: ['../assets/css/cellphone.css']
})


export class CellPhoneComponent implements OnDestroy {
  cellPhone: string;
  smsCode: string;
  error = null;
  defaultlbl = '发送验证码';
  verifylbl = this.defaultlbl;
  intervalId = 0;
  seconds = 60;

  constructor(private smsService: SMSService,
              private router: Router) {
  }

  ngOnDestroy(): void {
    this.clearTimer();
  }

  sendSMS() {
    if (this.cellPhone) {
      this.cleanerror();
      this.clearTimer();
      document.getElementById('verifybtn').setAttribute('disabled', 'true');
      this.intervalId = window.setInterval(() => {
        this.seconds--;
        if (this.seconds === 0) {
          this.clearTimer();
          this.verifylbl = this.defaultlbl;
          document.getElementById('verifybtn').removeAttribute('disabled');
        } else {
          this.verifylbl = "(" + this.seconds + ")秒";
        }
      }, 1000);
      this.smsService
        .sendSMS(this.cellPhone)
        .then(res => this.error = ('OK' == res.Code) ? null : '频繁获取验证码')
        .catch(error => this.error = error);
    } else {
      this.error = "请输入手机号";
    }
  }

  onSubmit() {
    if (this.smsCode) {
      this.smsService
        .verifySMS(this.cellPhone, this.smsCode)
        .then(res => {
          if ('OK' == res.Code) {
            sessionStorage.setItem('cellPhone', this.cellPhone);
            this.router.navigate(['register']);
          } else {
            this.error = '验证码错误';
          }
        })
        .catch(error => this.error = error);
    } else {
      this.error = "请输入验证码";
    }
  }

  private clearTimer() {
    clearInterval(this.intervalId);
  }

  cleanerror() {
    this.error = null;
  }
}
