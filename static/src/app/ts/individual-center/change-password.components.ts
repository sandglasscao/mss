import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Profile} from "./profile";
import {ProfileService} from "./profile.service";

@Component({
  selector: 'chng-pwd',
  templateUrl: 'static/src/app/templates/individual-center/change-password.html',
  styleUrls: ['static/src/app/templates/individual-center/change-password.css']
})
export class ChangePasswordComponent implements OnInit {
  password = null;
  old_pwd = null;
  second_pwd = null;
  error = null;

  @Input() showChng: boolean;
  @Output() changed = new EventEmitter();

  constructor(private profileService: ProfileService) {
  }

  ngOnInit(): void {
  }


  changePwd() {
    if (this.checkPwd()) {
      this.showChng = false;
      let result = {'toChangPwd': this.showChng, 'password': this.password};
      this.changed.emit(result);
    }
  }

  checkPwd(): boolean {
    this.error = (this.password != this.second_pwd) ? "密码不一致,请重新输入" : null;
    return (this.error) ? false : true;
  }

  cleanerror() {
    this.error = null;
  }
}


