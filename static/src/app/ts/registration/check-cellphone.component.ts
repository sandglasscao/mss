import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {RegistraterService} from "./registrater.service";


@Component({
  selector: 'register-form',
  templateUrl: 'static/src/app/templates/registration/check-cellphone.html',
  styleUrls: ['static/src/app/templates/registration/check-cellphone.css']
})


export class CheckCellphoneComponent {
  cellPhone: string;
  smsCode = "";
  verification = "";
  error = null;

  constructor(private registerService: RegistraterService,
              private router: Router) {
  }

  verifySMS() {
    if (this.cellPhone) {
      this.registerService
        .checkCell(this.cellPhone)
        .then(reg => {
          this.smsCode = reg.smsCode;
        })
        .catch(error => {
          // this.error = error;
          this.error = "验证码服务超时!"
        }); // TODO: Display error message
    }
  }

  onSubmit() {
    if (this.smsCode == this.verification) {
      this.router.navigate(['rgstr']);
    } else {
      this.error = "验证码错误";
    }
  }

  cleanerror() {
    this.error = null;
  }
}
