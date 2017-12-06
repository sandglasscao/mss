import {Component, OnInit} from '@angular/core';
import {Team} from "./team";
import {TeamService} from "./team.service";

@Component({
  selector: 'app-team',
  templateUrl: 'static/src/app/templates/dashboard/team.html',
  styleUrls: ['static/src/app/templates/dashboard/team.css'],
  providers: [TeamService]
})
export class TeamComponent implements OnInit {
  teamList: Team[];

  constructor(private teamService: TeamService) {
  }

  ngOnInit(): void {
    this.teamService
      .listTeam()
      .then(res => {
        this.teamList = res;
      })
  }

}
