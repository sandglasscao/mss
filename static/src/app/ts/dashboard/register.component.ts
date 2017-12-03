import {Component, OnInit} from '@angular/core';
import {Registration} from "./registration";
import {RegisterService} from "./registrater.service";
import {Router} from "@angular/router";

@Component({
  templateUrl: 'static/src/app/templates/dashboard/register.html',
  styleUrls: ['static/src/app/templates/dashboard/register.css'],
})
export class RegisterComponent implements OnInit {
  registration = new Registration();
  agents: Registration[];
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
      .getAgentName(this.registration.parent_code)
      .then(res => {
        this.agents = res
      })
      .catch(error => {
        // this.error = error;
        this.error = "业务员不存在!"
      });
  }

  onSubmit() {
    this.registerService
      .register(this.registration)
      .then(account => {
        sessionStorage.setItem('token', account.token);
        sessionStorage.setItem('username', account.cellphone);
        sessionStorage.setItem('isLogin', '1');
        this.router.navigate(['dashboard']);
      })
      .catch(error => {
        // this.error = error;
        this.error = "密码错误!"
      }); // TODO: Display error message
  }

  checkPwd() {
    if (this.registration.password != this.second_pwd)
      this.error = "密码不一致,请重新输入";
  }

  cleanerror() {
    this.error = null;
  }
}
