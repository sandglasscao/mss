import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProfileService} from "./profile.service";
import {User} from "./user";

@Component({
  selector: 'chng-pwd',
  templateUrl: 'static/src/app/templates/dashboard/change-password.html',
  styleUrls: ['static/src/app/templates/dashboard/change-password.css']
})
export class PasswordComponent implements OnInit {
  user = new User();
  second_pwd = null;
  error = null;

  @Input() showChng: boolean;
  @Output() changed = new EventEmitter();

  constructor(private profileService: ProfileService) {
  }

  ngOnInit(): void {
    this.user.username = sessionStorage.getItem('username');
  }
  back() {
    this.showChng = false;
          let result = {'toChangPwd': this.showChng};
          this.changed.emit(result);
  }

  changePwd() {
    if (this.checkPwd()) {
      this.profileService
        .changePwd(this.user)
        .then(res => {
          let a = 1;
          this.back();
        })
        .catch(error => {
          // this.error = error;
          this.error = "密码错误!"
        }); // TODO: Display error message
    }
  }

  checkPwd(): boolean {
    this.error = (this.user.password != this.second_pwd) ? "密码不一致,请重新输入" : null;
    return (this.error) ? false : true;
  }

  cleanerror() {
    this.error = null;
  }
}


