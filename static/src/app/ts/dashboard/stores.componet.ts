// TODO SOMEDAY: Feature Componetized like CrisisCenter
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'home-stores',
  templateUrl: 'static/src/app/templates/dashboard/stores.html',
  styleUrls: ['static/src/app/templates/dashboard/stores.css']
})
export class StoresComponet implements OnInit {
  constructor(private router: Router) {
  }
  teamMembers = [{
    "id": "1",
    "img": "logo1.jpg",
    "name": "公主殿下",
    "old": 21,
    "new": 7,
    "order": 51,
    "downline": 51,
  },{
    "id": "2",
    "img": "logo1.jpg",
    "name": "公主殿下",
    "old": 21,
    "new": 7,
    "order": 51,
    "downline": 51,
  },{
    "id": "3",
    "img": "logo1.jpg",
    "name": "公主殿下",
    "old": 21,
    "new": 7,
    "order": 51,
    "downline": 51,
  },{
    "id": "4",
    "img": "logo1.jpg",
    "name": "公主殿下",
    "old": 21,
    "new": 7,
    "order": 51,
    "downline": 51,
  },{
    "id": "5",
    "img": "logo1.jpg",
    "name": "公主殿下",
    "old": 21,
    "new": 7,
    "order": 51,
    "downline": 51,
  },{
    "id": "6",
    "img": "logo1.jpg",
    "name": "公主殿下",
    "old": 21,
    "new": 7,
    "order": 51,
    "downline": 51,
  }];
  ngOnInit(): void {
    let isLogin = sessionStorage.getItem('isLogin');
    if (!isLogin) {
      this.router.navigate(['/login']);
    }
  }
}
