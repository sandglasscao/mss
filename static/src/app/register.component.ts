import {Component, OnInit} from '@angular/core';
import {Registration} from "./registration";
import {RegisterService} from "./register.service";
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
          .getAgentName(this.registration.parent_cellphone)
          .subscribe(items => this.agents = items));
  }

  ngOnInit(): void {
    this.registration.cellphone = sessionStorage.getItem('cellPhone');
  }
  sendtel(tel){
    if (tel.length===11){
      this.registerService.sendtels(tel)
        .subscribe(res => {
          console.log(res);
        })
    }
  }

  onSubmit() {
    this.registerService
      .register(this.registration)
      .subscribe(
        account => {
          sessionStorage.setItem('token', account.token);
          sessionStorage.setItem('username', account.cellphone);
          this.router.navigate(['dashboard']);
        },
        error => this.error = "注册失败，该手机号已注册!");
  }

  checkPwd() {
    if (this.registration.password != this.second_pwd)
      this.error = "密码不一致,请重新输入";
  }

  cleanerror() {
    this.error = null;
  }
}
