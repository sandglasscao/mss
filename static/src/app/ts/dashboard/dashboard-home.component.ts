// TODO SOMEDAY: Feature Componetized like CrisisCenter
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'home-header',
  templateUrl: 'static/src/app/templates/dashboard/dashboard-home.html',
  styleUrls:['static/src/app/templates/dashboard/dashboard-home.css']
})
export class DashboardHomeComponent implements OnInit {
  constructor(private router: Router) {
  }

  ngOnInit(): void {
    let isLogin = sessionStorage.getItem('isLogin');
    if (!isLogin) {
      this.router.navigate(['/login']);
    }
  }
}
