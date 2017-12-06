import {Component} from '@angular/core';
import {Router} from '@angular/router';


import {CellphoneResetService} from './cellphone-reset.service';
import {User} from './dashboard/user';
import {Location} from '@angular/common';
@Component({
  selector: 'cell-reset',
  templateUrl: 'static/src/app/templates/dashboard/cellphone-reset.html',
  styleUrls: ['static/src/app/templates/dashboard/cellphone.css'],
  providers: [
    CellphoneResetService,
  ]
})


export class CellPhoneResetComponent {
  user = new User();
  next = 'reset-pwd';
  cellPhone: string;
  smsCode: string;
  verification = null;
  error = null;
  constructor(private cellphoneResetService: CellphoneResetService,
              private router: Router,
              private location: Location) {
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
    this.verification='1234'; // for debugging register functions
  }
  onSubmit() {
    if (this.user.username) {
      this.cellphoneResetService
        .check(this.user)
        .then(account => {
          sessionStorage.setItem('username', this.user.username);
          if (this.smsCode == this.verification) {
            this.router.navigate(['reset-pwd']);
          }else { this.error = "验证码错误"; }
        })
        .catch(error => {
          // this.error = error;
          this.error = "业务员不存在!"
        }); // TODO: Display error message
    } else {
      this.error = "验证未通过";
    }
  }
  cleanerror() {
    this.error = null;
  }
  back() {
    this.router.navigate(['../']);
  }
  goBack() {
    this.location.back();
  }
}
