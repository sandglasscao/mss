import {Component, OnInit} from '@angular/core';
import {Store} from "./store";
import {StoreService} from "./store.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import "rxjs/add/operator/switchMap";
import {Observable} from "rxjs/Observable";


@Component({
  selector: 'app-teamDownLine',
  templateUrl: 'static/src/app/templates/dashboard/store-detail.html',
  styleUrls: ['static/src/app/templates/dashboard/store-detail.css']
})
export class StoreDetailComponent implements OnInit {
  store: Store;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private service: StoreService) {
  }

  ngOnInit(): void {
    this.store = this.service.getStore(sessionStorage.getItem('selected'));
  }
}
