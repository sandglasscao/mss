import {Component, OnInit} from '@angular/core';
import {Store} from "./store";
import {StoreService} from "./store.service";
import "rxjs/add/operator/switchMap";
import { Location }                 from '@angular/common';

@Component({
  selector: 'app-teamDownLine',
  templateUrl: 'static/src/app/templates/dashboard/store-detail.html',
  styleUrls: ['static/src/app/templates/dashboard/store-detail.css']
})
export class StoreDetailComponent implements OnInit {
  store: Store;
  getShow = sessionStorage.getItem('getShow');

  constructor(private service: StoreService,
              private location: Location) {
  }

  ngOnInit(): void {
    this.store = this.service.getStore(sessionStorage.getItem('selected'));
    console.log(this.store.coord);
    let pos = sessionStorage.getItem('coordInfo');
    if (this.getShow) {
      this.store.coord = pos;
    }
    console.log(this.store.coord);
  }

  goBack(): void {
    this.location.back();
  }
}
