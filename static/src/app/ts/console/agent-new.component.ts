import {Component} from '@angular/core';
import {CommissionService} from "./commission.service";
import {NewAgent} from "./newagent";
import {AgentService} from "./agent.service";

@Component({
  selector: 'agnt-new',
  templateUrl: 'static/src/app/templates/console/agent-new.html',
  styleUrls: ['static/src/app/templates/console/agent-new.css'],
  providers: [CommissionService]
})
export class AgentNewComponent {
  agent = new NewAgent();

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
