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
  }

  goBack(): void {
    this.location.back();
  }
}
