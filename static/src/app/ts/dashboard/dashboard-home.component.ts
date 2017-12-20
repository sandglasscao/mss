// TODO SOMEDAY: Feature Componetized like CrisisCenter
import {Component, OnInit} from '@angular/core';
import {DashboardHome} from "./dashboard-home";
import {DashboardHomeService} from "./dashboard-home.service";

@Component({
  selector: 'app-dashhome',
  templateUrl: '../../templates/dashboard/dashboard-home.html',
  styleUrls: ['../../templates/dashboard/dashboard-home.css'],
  providers: [DashboardHomeService]
})
export class DashboardHomeComponent implements OnInit {
  summary = new DashboardHome();

  constructor(private dashboardHomeSerice: DashboardHomeService) {
  }

  ngOnInit(): void {
    this.dashboardHomeSerice
      .getSummary()
      .then(res => {
        this.summary = res ? res[0] : this.summary;
      })
  }
}
