import {Component} from '@angular/core';
import {Registration} from "./registration";
import {RegistraterService} from "./registrater.service";
import {Router} from "@angular/router";

@Component({
  templateUrl: 'static/src/app/templates/registration/register.html',
  styleUrls: ['static/src/app/templates/registration/register.css']
})
export class RegisterComponent {
  error = null;
  registration = new Registration();
  second_pwd = "";

  constructor(private registerService: RegistraterService,
              private router: Router) {
  }

  onSubmit() {
    if (this.registration.cellphone) {
      this.registerService
        .register(this.registration)
        .then(account => {
          this.router.navigate(['/dashboard']);
        })
        .catch(error => {
          // this.error = error;
          this.error = "密码错误!"
        }); // TODO: Display error message
    }
  }

  checkPwd() {
    if (this.registration.password != this.second_pwd)
      this.error = "密码不一致,请重新输入";
  }

  cleanerror() {
    this.error = null;
  }
}
