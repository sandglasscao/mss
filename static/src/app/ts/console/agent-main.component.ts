import {Component} from '@angular/core';
import {AgentService} from "./agent.service";
import {Agent} from "./agent";

@Component({
  selector: 'agnt-new',
  templateUrl: 'static/src/app/templates/console/agent-main.html',
  styleUrls: ['static/src/app/templates/console/agent-main.css'],
  providers: [AgentService]
})
export class AgentMainComponent {
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
