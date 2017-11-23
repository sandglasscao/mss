// TODO SOMEDAY: Feature Componetized like CrisisCenter
import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  templateUrl: 'static/src/app/templates/dashboard/dashboard.html'
})
export class DashboardComponent implements OnInit{
  constructor(private router: Router){}

  ngOnInit(): void {
    this.router.navigate(['/login']);
  }
}
