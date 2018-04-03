import {Component} from '@angular/core';
import {AgentService} from "./agent.service";
import {Agent1} from "../agent";

@Component({
  selector: 'agent-new',
  templateUrl: '../../assets/templates/console/agent-new.html',
  styleUrls: ['../../assets/css/console/agent-new.css']
})
export class AgentNewComponent {
  agent = new Agent1();
  pwdConfirm = '';
  error = null;
  pwd_err = null;

  constructor(private agentService: AgentService) {
  }
  confirm_pwd(){
    if (this.pwdConfirm && (this.pwdConfirm !== this.agent.password)){
      this.pwd_err = '密码不一致，请重新输入！';
    }else {
      this.pwd_err = null;
    }
  }

  onSubmit() {
    if (this.check(this.agent)){
      this.agent.password = this.agent.password ? this.agent.password : this.agent.cellphone;
    this.agent.status=false;
    this.agentService
      .createAgent(this.agent)
      .subscribe(
        res => {
            if (res.result==='successful'){
              alert("设置成功!");
            }else if (res.result==='faild'){
              alert("失败!");
            }else if (res.result==="username_exist"){
              alert("该业务员编号已存在!");
            }else if (res.result==="cellphone_exist"){
              alert("该手机号已注册!");
            }else if (res.result==="rec_notexist"){
              alert("推荐人不存在!");
            }else if (res.result==="rec_nopowerrec"){
              alert("推荐人无推荐资格!");
            }
          },
          error => {
            this.error = "失败！";
            alert("失败！");
          }
      );
    }
  }
  check(agent){
    return (agent.username&&agent.full_name&&this.agent.password&&agent.cellphone&&agent.cellphone.length===11);
  }
  cleanerror() {
    this.error = null;
  }
}
