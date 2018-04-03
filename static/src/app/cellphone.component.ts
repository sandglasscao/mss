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
  defaultlbl = '获取验证码';
  verifylbl = this.defaultlbl;
  intervalId = 0;
  seconds = 300;

  constructor(private smsService: SMSService,
              private router: Router) {
  }

  ngOnDestroy(): void {
    this.clearTimer();
  }

  sendSMS() {
    if (this.cellPhone) {
      this.smsService
        .sendSMS(this.cellPhone)
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
                this.seconds=300;
                this.verifylbl = this.defaultlbl;
                document.getElementById('verifybtn').removeAttribute('disabled');
              } else {
                this.verifylbl = "(" + this.seconds + ")秒";
              }
            }, 1000);
          }else if (res.Code=='cellphone_exist'){
            this.error = '该手机号已注册！';
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
      const time ='' +  Math.floor(new Date().getTime() / 1000);
      this.smsService
        .verifySMS(this.cellPhone, this.smsCode, time)
        .then(res => {
          if ('OK' == res.Code) {
            sessionStorage.setItem('cellPhone', this.cellPhone);
            this.router.navigate(['register']);
          } else if (res.Code == 'timeOut'){
            this.error = '验证码已失效，请重新获取！';
          }else if (res.Code == 'used'){
            this.error = '验证码已使用，请获取新的验证码！';
          }else {
            this.error = '验证码错误';
          }
        })
        .catch(error => this.error = error);
    } else {
      this.error = "请输入验证码";
    }

    /*sessionStorage.setItem('cellPhone', this.cellPhone);
            this.router.navigate(['register']);*/
  }

  private clearTimer() {
    clearInterval(this.intervalId);
  }

  cleanerror() {
    this.error = null;
  }
}
