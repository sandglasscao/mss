// TODO SOMEDAY: Feature Componetized like CrisisCenter
import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  templateUrl: 'static/src/app/templates/dashboard/dashboard.html'
})
export class DashboardComponent implements OnInit {
  isProfile: boolean;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    let isLogin = sessionStorage.getItem('isLogin');
    if (!isLogin) {
      this.router.navigate(['/login']);
    }
    this.isProfile = false;
  }

  changeShow(value) {
        this.isProfile = value['isProfile'];
    }
}
