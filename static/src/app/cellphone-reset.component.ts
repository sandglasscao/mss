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
  defaultlbl = '获取验证码';
  verifylbl = this.defaultlbl;
  intervalId = 0;
  seconds = 60;

  constructor(private registerService: RegisterService,
              private smsService: SMSService,
              private router: Router) {
  }

  ngOnDestroy(): void {
    this.clearTimer();
  }

  /*sendSMS() {
    if (this.cellPhone) {
      this.cleanerror();
      this.clearTimer();
      document.getElementById('verifybtn').setAttribute('disabled', 'true');
      this.intervalId = window.setInterval(() => {
        this.seconds--;
        if (this.seconds === 0) {
          this.clearTimer();
          this.seconds=60;
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
    }
  }*/

  sendSMS() {
    if (this.cellPhone) {
      this.smsService
        .sendSMS2(this.cellPhone)
        .then(res => {
          if (res.Code=='OK'){
            this.error = null;
            this.cleanerror();
            this.clearTimer();
            document.getElementById('verifybtn').setAttribute('disabled', 'true');
            this.intervalId = window.setInterval(() => {
              this.seconds--;
              if (this.seconds === 0) {
                this.clearTimer();
                this.seconds=60;
                this.verifylbl = this.defaultlbl;
                document.getElementById('verifybtn').removeAttribute('disabled');
              } else {
                this.verifylbl = "(" + this.seconds + ")秒";
              }
            }, 1000);
          }else if (res.Code=='cellphone_notexist'){
            this.error = '该手机号未注册！';
          }
          else{
            this.error = '频繁获取验证码';
          }
        })
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
            this.registerService
              .cellExist(this.cellPhone)
              .subscribe(
                res => {
                  sessionStorage.setItem('username', res.username);
                  sessionStorage.setItem('token', res.token);
                  this.router.navigate(['reset-pwd']);
                },
                error => this.error = "您尚未注册!");
          } else this.error = '验证码错误';
        })
    } else this.error = "请输入验证码";
  }

  private clearTimer() {
    clearInterval(this.intervalId);
  }

  cleanerror() {
    this.error = null;
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
