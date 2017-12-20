import {Component, OnInit} from '@angular/core';
import {Store} from "./store";
import {StoreService} from "./store.service";
import "rxjs/add/operator/switchMap";
import {Router} from "@angular/router";

@Component({
  selector: 'app-detail',
  templateUrl: 'static/src/app/templates/dashboard/store-detail.html',
  styleUrls: ['static/src/app/templates/dashboard/store-detail.css']
})
export class StoreDetailComponent implements OnInit {
  store: Store;
  getShow: string;
  error: null;
  indoor_pic: number;
  outdoor_pic: number;
  license_pic: number;

  constructor(private service: StoreService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getShow = sessionStorage.getItem('getShow');
    this.store = this.service.getStore(sessionStorage.getItem('selected'));
    this.store.longitude = this.getShow ? +sessionStorage.getItem('lng') : this.store.longitude;
    this.store.latitude = this.getShow ? +sessionStorage.getItem('lat') : this.store.latitude;
    this.indoor_pic = this.store.indoor_pic ? 1 : 0;
    this.outdoor_pic = this.store.outdoor_pic ? 1 : 0;
    this.license_pic = this.store.license_pic ? 1 : 0;
  }

  goBack(){
    this.router.navigate(['/dashboard/store']);
  }

  saveLatlng() {
    this.service
      .saveLatlng(this.store)
      .catch(error => {
        this.error = error;
      });
  }
}
