import {Component, OnInit} from '@angular/core';
import {DashboardHome} from "./dashboard-home";
import {DashboardHomeService} from "./dashboard-home.service";

@Component({
  selector: 'app-dashhome',
  templateUrl: '../../assets/templates/dashboard/dashboard-home.html',
  styleUrls: ['../../assets/css/dashboard/dashboard-home.css'],
  providers: [DashboardHomeService]
})
export class DashboardHomeComponent implements OnInit {
  summary = new DashboardHome();

  constructor(private dashboardHomeSerice: DashboardHomeService) {
  }

  ngOnInit(): void {
    this.dashboardHomeSerice
      .getSummary()
      .subscribe(res => {
        console.log(res);
        this.summary = res;
      });
  }
}
