// TODO SOMEDAY: Feature Componetized like CrisisCenter
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'home-team',
  templateUrl: 'static/src/app/templates/dashboard/sales-center.html',
  styleUrls: ['static/src/app/templates/dashboard/sales-center.css']
})
export class TeamComponent implements OnInit {
  constructor(private router: Router) {
  }
  onActive = true;
  decide(tf: boolean) {
    this.onActive = tf;
  }
  ngOnInit(): void {
    let isLogin = sessionStorage.getItem('isLogin');
    if (!isLogin) {
      this.router.navigate(['/login']);
    }
  }
}
