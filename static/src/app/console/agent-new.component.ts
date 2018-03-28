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

  error = null;

  constructor(private agentService: AgentService) {
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
