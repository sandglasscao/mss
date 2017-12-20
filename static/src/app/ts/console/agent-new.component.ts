import {Component} from '@angular/core';
import {AgentService} from "./agent.service";
import {Profile} from "../dashboard/profile";

@Component({
  selector: 'agent-new',
  templateUrl: '../../templates/console/agent-new.html',
  styleUrls: ['../../templates/console/agent-new.css']
})
export class AgentNewComponent{

  agent = new Profile();

  error: any;

  constructor(private agentService: AgentService) {
  }

  onSubmit() {
    this.agent.password = this.agent.password ? this.agent.password : this.agent.cellphone;
    this.agentService
      .createAgent(this.agent)
      .then(res => {
        let a = 1;
      })
      .catch(error => {
        this.error = error;
      });
  }

  cleanerror() {
    this.error = null;
  }
}
