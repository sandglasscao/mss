import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {RegisterService} from "./registrater.service";


@Component({
  selector: 'register-form',
  templateUrl: 'static/src/app/templates/dashboard/check-cellphone.html',
  styleUrls: ['static/src/app/templates/dashboard/check-cellphone.css']
})


export class CellPhoneComponent {
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
    this.verification='1234'; // for debugging register functions
  }

  onSubmit() {
    if (this.verification && this.smsCode == this.verification) {
      sessionStorage.setItem('cellPhone', this.cellPhone);
      this.router.navigate(['register']);
    } else {
      this.error = "验证未通过";
    }
  }

  cleanerror() {
    this.error = null;
  }
}