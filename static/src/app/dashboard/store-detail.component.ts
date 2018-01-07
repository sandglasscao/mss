import {Component, OnInit} from '@angular/core';
import {Store} from "./store";
import {StoreService} from "./store.service";
import "rxjs/add/operator/switchMap";
import {Router} from "@angular/router";

@Component({
  selector: 'app-detail',
  templateUrl: '../../assets/templates/dashboard/store-detail.html',
  styleUrls: ['../../assets/css/dashboard/store-detail.css']
})
export class StoreDetailComponent implements OnInit {
  store: Store;
  getShow: string;
  error: null;
  has_license_pic: number;
  has_indoor_pic: number;
  has_outdoor_pic: number;

  constructor(private service: StoreService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getShow = sessionStorage.getItem('getShow');
    this.store = this.service.getStore(sessionStorage.getItem('selected'));
    this.store.longitude = this.getShow ? +sessionStorage.getItem('lng') : this.store.longitude;
    this.store.latitude = this.getShow ? +sessionStorage.getItem('lat') : this.store.latitude;
    this.has_license_pic = this.store.license_pic ? 1 : 0;
    this.has_indoor_pic = this.store.indoor_pic ? 1 : 0;
    this.has_outdoor_pic = this.store.outdoor_pic ? 1 : 0;
  }

  goBack(){
    this.router.navigate(['/dashboard/store']);
  }

  saveLatlng() {
    this.service
      .saveLatlng(this.store)
      .subscribe(error => this.error = error);
  }
}
