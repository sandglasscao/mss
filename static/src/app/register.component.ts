import {Component, OnInit} from '@angular/core';
import {Registration} from "./registration";
import {RegisterService} from "./registrater.service";
import {Router} from "@angular/router";
import {FormControl} from "@angular/forms";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";

@Component({
  templateUrl: '../assets/templates/register.html',
  styleUrls: ['../assets/css/register.css'],
})
export class RegisterComponent implements OnInit {
  term = new FormControl();
  registration = new Registration();
  agents: Registration[];
  second_pwd = null;
  error = null;

  constructor(private registerService: RegisterService,
              private router: Router) {
    this.term.valueChanges
      .debounceTime(100)
      .distinctUntilChanged()
      .subscribe(term =>
        this.registerService
          .getAgentName(this.registration.parent_code)
          .then(items => this.agents = items));
  }

  ngOnInit(): void {
    this.registration.cellphone = sessionStorage.getItem('cellPhone');
  }

  onSubmit() {
    this.registerService
      .register(this.registration)
      .then(account => {
        sessionStorage.setItem('token', account.token);
        sessionStorage.setItem('username', account.cellphone);
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
