import {Component, OnInit} from '@angular/core';
import {AgentService} from "./agent.service";
import {Profile} from "../dashboard/profile";
import {errorComparator} from "tslint/lib/verify/lintError";

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

          if (!res.previous){
            this.previouspg = res.previous;
          }else {
            let temps = res.previous.split('/');
            let d = window.location.origin;
            for (let i = 3; i<temps.length; i++) {
              d+='/'+temps[i];
            }
            this.previouspg = d;
          }
          if (!res.next){
            this.nextpg = res.next;
          }else {
            let temp = res.next.split('/');
            let c = window.location.origin;
            for (let i = 3; i<temp.length; i++) {
              c+='/'+temp[i];
            }
            this.nextpg = c;
          }

          this.agents = res.results;
          this.pageNo = Number(res.next ? Number(res.next.split("page=")[1]) - 1 :
            (res.previous ? Number(res.previous.split("page=")[1]) + 1 : 1));
        },
        error => this.error = error
      );
  }
  /*temptrans(one, two) {
    if (two !== null) {
      let temp = two.split('/');
      let c = window.location.origin;
      for (let i = 3; i<temp.length; i++) {
        c+='/'+temp[i];
      }
      one = c;
    }else {
      one = two;
    }
  }*/
  paginate(link: string) {
    this.agentService
      .paginate(link)
      .subscribe(
        res => {
          this.agents = res.results;
          /*this.previouspg = res.previous;
          this.nextpg = res.next;*/

          if (!res.previous){
            this.previouspg = res.previous;
          }else {
            let temps = res.previous.split('/');
            let d = window.location.origin;
            for (let i = 3; i<temps.length; i++) {
              d+='/'+temps[i];
            }
            this.previouspg = d;
          }
          if (!res.next){
            this.nextpg = res.next;
          }else {
            let temp = res.next.split('/');
            let c = window.location.origin;
            for (let i = 3; i<temp.length; i++) {
              c+='/'+temp[i];
            }
            this.nextpg = c;
          }



          /*this.temptrans(this.nextpg, res.next);
          this.temptrans(this.previouspg, res.previous);*/
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
  checks(agent: Profile) {
    agent.status=true;
    this.agentService
      .checks(agent)
      .subscribe(error => this.error = error);
  }
}
