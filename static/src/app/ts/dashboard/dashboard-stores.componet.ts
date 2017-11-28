// TODO SOMEDAY: Feature Componetized like CrisisCenter
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'home-stores',
  templateUrl: 'static/src/app/templates/dashboard/store-center/stores.html',
  styleUrls:['static/src/app/templates/dashboard/store-center/stores.css']
})
export class DashboardStoresComponent implements OnInit {
  constructor(private router: Router) {
  }

  ngOnInit(): void {
    let isLogin = sessionStorage.getItem('isLogin');
    if (!isLogin) {
      this.router.navigate(['/login']);
    }
  }
}
