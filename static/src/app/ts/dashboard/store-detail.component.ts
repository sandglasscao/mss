import {Component, OnInit} from '@angular/core';
import {Store} from "./store";
import {StoreService} from "./store.service";
import "rxjs/add/operator/switchMap";
import {Location} from '@angular/common';

@Component({
  selector: 'app-teamDownLine',
  templateUrl: 'static/src/app/templates/dashboard/store-detail.html',
  styleUrls: ['static/src/app/templates/dashboard/store-detail.css']
})
export class StoreDetailComponent implements OnInit {
  store: Store;
  getShow: string;
  error: null;

  constructor(private service: StoreService,
              private location: Location) {
  }

  ngOnInit(): void {
    this.getShow = sessionStorage.getItem('getShow');
    this.store = this.service.getStore(sessionStorage.getItem('selected'));
    this.store.longitude = this.getShow ? +sessionStorage.getItem('lng') : this.store.longitude;
    this.store.latitude = this.getShow ? +sessionStorage.getItem('lat') : this.store.latitude;
  }

  goBack(): void {
    this.location.back();
  }

  saveLatlng() {
    this.service
      .saveLatlng(this.store)
      .then(res=>{
        let a = 1;
      })
      .catch(error => {
        this.error = error;
      });
  }
}
