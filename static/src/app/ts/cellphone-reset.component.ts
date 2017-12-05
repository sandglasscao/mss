import {Component} from '@angular/core';
import {Router} from '@angular/router';


import {CellphoneResetService} from './cellphone-reset.service';
import {User} from './dashboard/user';
import {ProfileService} from './dashboard/profile.service';
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
  error = null;

  constructor(private cellphoneService: CellphoneResetService,
              private profileService: ProfileService,
              private router: Router) {
  }
  onSubmit() {
    if (this.user.username) {
      this.cellphoneService
        .login(this.user)
        .then(account => {
          sessionStorage.setItem('token', account.token);
          sessionStorage.setItem('username', this.user.username);
          this.routSwitch();
        })
        .catch(error => {
          // this.error = error;
          this.error = "业务员不存在!"
        }); // TODO: Display error message
    }
  }
  routSwitch() {
    this.profileService
      .getProfile(this.user.username)
      .then(res => {
        this.next = (res.user.is_staff) ? 'reset-pwd' : 'login';
        let entry = (res.user.is_staff) ? 'reset-pwd' : 'login';
        sessionStorage.setItem('entry', entry);
        this.router.navigate([this.next]);
      })
      .catch(error => {
        // this.error = error;
        this.error = "业务员不存在!"
      });
  }

  cleanerror() {
    this.error = null;
  }
}
