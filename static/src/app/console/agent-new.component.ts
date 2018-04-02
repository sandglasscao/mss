import {Component} from '@angular/core';
import {AgentService} from "./agent.service";
import {Profile} from "../dashboard/profile";

@Component({
  selector: 'agent-new',
  templateUrl: '../../assets/templates/console/agent-new.html',
  styleUrls: ['../../assets/css/console/agent-new.css']
})
export class AgentNewComponent {
  agent = new Profile();
  pwdConfirm = '';
  error = null;
  pwd_err = null;

  constructor(private agentService: AgentService) {
  }
  confirm_pwd(){
    if (this.pwdConfirm !== this.agent.password){
      this.pwd_err = '密码不一致，请重新输入！';
    }
  }

  onSubmit() {
    this.agent.password = this.agent.password ? this.agent.password : this.agent.cellphone;
    this.agent.status=false;
    this.agentService
      .createAgent(this.agent)
      .subscribe(
        res => {
            this.agent = res;
            alert("设置成功!");
          },
          error => {
            this.error = error;
            alert("失败！");
          }
      );
  }

  cleanerror() {
    this.error = null;
  }
}
