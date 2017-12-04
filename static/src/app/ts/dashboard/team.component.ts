import {Component} from '@angular/core';

@Component({
  selector: 'app-team',
  templateUrl: 'static/src/app/templates/dashboard/team.html',
  styleUrls: ['static/src/app/templates/dashboard/team.css']
})
export class TeamComponent {
  teamList = [
    {
      "img": "logo1.jpg",
      "name": "公主殿下",
      "old": "21",
      "new": "7",
      "order": "51",
      "downLine": "36"
    },
    {
      "img": "logo1.jpg",
      "name": "殿下",
      "old": "21",
      "new": "7",
      "order": "51",
      "downLine": "36"
    }
  ];
}
