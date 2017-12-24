import {Component, OnInit} from '@angular/core';
import {Team} from "./team";
import {TeamService} from "./team.service";

@Component({
  selector: 'app-team',
  templateUrl: '../../assets/templates/dashboard/team.html',
  styleUrls: ['../../assets/css/dashboard/team.css'],
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
