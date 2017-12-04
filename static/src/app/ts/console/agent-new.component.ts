import {Component} from '@angular/core';
import {AgentService} from "./agent.service";
import {Agent} from "./agent";

@Component({
  selector: 'agent-new',
  templateUrl: 'static/src/app/templates/console/agent-new.html',
  styleUrls: ['static/src/app/templates/console/agent-new.css'],
  providers: [AgentService]
})
export class AgentNewComponent {
  agent = new Agent();

  error = null;

  constructor(private agentService: AgentService) {
  }

  onSubmit() {
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
