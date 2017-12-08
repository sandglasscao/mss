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
  constructor(private service: StoreService,
              private location: Location) {
  }

  ngOnInit(): void {
    this.store = this.service.getStore(sessionStorage.getItem('selected'));

    let coordsP = JSON.parse(sessionStorage.getItem('coordInfo'));
    console.log(coordsP);
    this.store.coord = (coordsP)?('(' + coordsP.coords.lng + ',' + coordsP.coords.lat + ')'):'待获取';
  }

  goBack(): void {
    this.location.back();
  }
}
