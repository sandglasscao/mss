import {Component, OnInit} from '@angular/core';
import {Registration} from "./registration";
import {RegisterService} from "./registrater.service";
import {Router} from "@angular/router";

@Component({
  templateUrl: 'static/src/app/templates/dashboard/register.html',
  styleUrls: ['static/src/app/templates/dashboard/register.css']
})
export class RegisterComponent implements OnInit {
  registration = new Registration();
  second_pwd = null;
  error = null;

  constructor(private registerService: RegisterService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.registration.cellphone = sessionStorage.getItem('cellPhone');
  }

  getAgentName() {
     this.registerService
        .getAgentName(this.registration.parentCode)
        .then(registration => {
          this.registration.parentName = registration.full_name;
          this.registration.parentid = registration.parentid;
        })
        .catch(error => {
          // this.error = error;
          this.error = "业务员不存在!"
        });
  }
  onSubmit() {
    if (this.registration.cellphone) {
      this.registerService
        .register(this.registration)
        .then(account => {
          this.router.navigate(['dashboard']);
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
