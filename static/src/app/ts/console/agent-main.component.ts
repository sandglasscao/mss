import {Component, OnInit} from '@angular/core';
import {AgentService} from "./agent.service";
import {Profile} from "../dashboard/profile";
import {User} from "../dashboard/user";

@Component({
  selector: 'agnt-main',
  templateUrl: 'static/src/app/templates/console/agent-main.html',
  styleUrls: ['static/src/app/templates/console/agent-main.css']
})
export class AgentMainComponent implements OnInit {
  agents: Profile[];
  count: number;
  pageNo: number;
  previouspg: string;
  nextpg: string;
  error = null;

  constructor(private agentService: AgentService) {
  }

  ngOnInit(): void {
    this.agentService
      .listAgent()
      .then(res => {
        this.count = res.count;
        this.previouspg = res.previous;
        this.nextpg = res.next;
        this.agents = res.results;
        this.pageNo = Number(res.next ? Number(res.next.split("page=")[1]) - 1 :
          (res.previous ? Number(res.previous.split("page=")[1]) + 1 : 1));
      })
      .catch(error => {
        this.error = error;
      });
  }

  paginate(link: string) {
    this.agentService
      .paginate(link)
      .then(res => {
        this.agents = res.results;
        this.previouspg = res.previous;
        this.nextpg = res.next;
        this.pageNo = Number(res.next ? Number(res.next.split("page=")[1]) - 1 :
          (res.previous ? Number(res.previous.split("page=")[1]) + 1 : 1));
      })
      .catch(error => this.error = error);
  }

  resetPwd(agent: Profile) {
    let usr = agent.user;
    usr.password = agent.cellphone;
    this.agentService
      .resetPwd(usr)
      .catch(error => {
        this.error = error;
      });
  }
}
