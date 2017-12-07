import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {TeamService} from "./team.service";
import {Team} from "./team";
import "rxjs/add/operator/switchMap";


@Component({
  selector: 'app-teamDownLine',
  templateUrl: 'static/src/app/templates/dashboard/team-downline.html',
  styleUrls: ['static/src/app/templates/dashboard/team-downline.css'],
  providers: [TeamService]
})
export class TeamDownlineComponent implements OnInit {
  myTeam: Team[];
  agentId: string;

  constructor(private route: ActivatedRoute,
              private teamService: TeamService) {}


  ngOnInit(): void {
    /*this.agentId = this.route.paramMap
      .switchMap((params: ParamMap) =>params.get('id'));*/
    let a = 1;
  }

}
