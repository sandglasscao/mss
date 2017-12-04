import {Component} from '@angular/core';
import { Location }                 from '@angular/common';


@Component({
  selector: 'app-teamDownLine',
  templateUrl: 'static/src/app/templates/dashboard/teamDownLine.html',
  styleUrls: ['static/src/app/templates/dashboard/teamDownLine.css']
})
export class TeamDownLineComponent {
  constructor(private location: Location) {
  }
  goBack(): void {
    this.location.back();
  }
}
