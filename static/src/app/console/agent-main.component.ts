import {Component, OnInit} from '@angular/core';
import {AgentService} from "./agent.service";
import {Profile} from "../dashboard/profile";

@Component({
  selector: 'agnt-main',
  templateUrl: '../../assets/templates/console/agent-main.html',
  styleUrls: ['../../assets/css/console/agent-main.css']
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
      .subscribe(
        res => {
          this.count = Math.ceil(res.count / 10);
          this.previouspg = res.previous;
          this.nextpg = res.next;
          this.agents = res.results;
          this.pageNo = Number(res.next ? Number(res.next.split("page=")[1]) - 1 :
            (res.previous ? Number(res.previous.split("page=")[1]) + 1 : 1));
        },
        error => this.error = error
      );
  }

  paginate(link: string) {
    this.agentService
      .paginate(link)
      .subscribe(
        res => {
          this.agents = res.results;
          this.previouspg = res.previous;
          this.nextpg = res.next;
          this.pageNo = Number(res.next ? Number(res.next.split("page=")[1]) - 1 :
            (res.previous ? Number(res.previous.split("page=")[1]) + 1 : 1));
        },
        error => this.error = error
      );
  }

  resetPwd(agent: Profile) {
    let usr = agent.user;
    usr.password = agent.cellphone;
    this.agentService
      .resetPwd(usr)
      .subscribe(error => this.error = error);
  }

  delAgent(agent: Profile) {
    agent.isDeleted = true;
    this.agentService
      .delAgent(agent)
      .subscribe(error => this.error = error);
  }
}
