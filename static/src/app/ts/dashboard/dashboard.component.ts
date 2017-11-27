// TODO SOMEDAY: Feature Componetized like CrisisCenter
import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  templateUrl: 'static/src/app/templates/dashboard/dashboard.html',
  styleUrls:['static/src/app/templates/dashboard/dashboard.css']
})
export class DashboardComponent implements OnInit {
  constructor(private router: Router) {
  }

  ngOnInit(): void {
    let isLogin = sessionStorage.getItem('isLogin');
    if (!isLogin) {
      this.router.navigate(['/login']);
    }
  }
}
