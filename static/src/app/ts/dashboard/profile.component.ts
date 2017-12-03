import {Component, OnInit} from '@angular/core';
import {Profile} from "./profile";
import {ProfileService} from "./profile.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: 'static/src/app/templates/dashboard/profile.html',
  styleUrls: ['static/src/app/templates/dashboard/profile.css'],
  providers: []
})
export class ProfileComponent implements OnInit {
  profile = new Profile();
  username = null;
  hasRecommAuth: string;
  error = null;

  constructor(private profileService: ProfileService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.initProfile();
  }

  initProfile() {
    this.username = sessionStorage.getItem('username');
    this.profileService
      .getProfile(this.username)
      .then(res => {
        this.dealProfile(res);
      })
      .catch(error => {
        // this.error = error;
        this.error = "业务员不存在!"
      });
  }

  private dealProfile(res: Profile) {
    this.profile.username = this.username;
    this.profile.full_name = res.full_name;
    this.profile.cellphone = res.cellphone;
    this.profile.hasRecommAuth = res.hasRecommAuth;
    this.hasRecommAuth = this.profile.hasRecommAuth ? '有资格' : '没有资格';
    this.profile.parent_code = res['parent_agent'] ? res['parent_agent'].username : null;
    this.profile.created_dt = res.created_dt;
  }

  onSubmit() {
    /* this.registerService
       .register(this.registration)
       .then(account => {
         sessionStorage.setItem('token', account.token);
         sessionStorage.setItem('username', account.cellphone);
         sessionStorage.setItem('isLogin', '1');
       })
       .catch(error => {
         // this.error = error;
         this.error = "密码错误!"
       }); // TODO: Display error message*/
  }

  changPwd() {
    this.router.navigate(['password']);
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/']);
  }

  cleanerror() {
    this.error = null;
  }
}
