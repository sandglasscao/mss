// TODO SOMEDAY: Feature Componetized like CrisisCenter
import {Component, OnInit} from '@angular/core';
import {Store} from "./store";
import {StoreService} from "./store.service";
import {MetaService} from "../meta/meta.service";
import {StoreStatus} from "./store-status";
import {forEach} from "@angular/router/src/utils/collection";

@Component({
  selector: 'home-stores',
  templateUrl: 'static/src/app/templates/dashboard/stores.html',
  styleUrls: ['static/src/app/templates/dashboard/stores.css'],
  providers: [StoreService]
})
export class StoresComponent implements OnInit {
  onActive = true;
  stores: Store[];
  storeStatus: StoreStatus[];
  commLen = 0;
  uncommLen = 0;
  error = null;

  constructor(private storeService: StoreService,
              private metaService: MetaService) {
  }


  ngOnInit(): void {
    this.listStoreStatus();
    this.initStores();
  }

  initStores() {
    this.storeService
      .listStore()
      .then(res => {
        this.stores = res;
        let commStroes = this.stores.filter(store => store.status == '2');
        this.commLen = commStroes.length;
        this.uncommLen = this.stores.length - this.commLen;
        this.stores.map(store => {
          store.status = this.storeStatus.find(st => st.code == store.status).value;
        });
      })
      .catch(error => {
        // this.error = error;
        this.error = "业务员不存在!"
      });
  }

  decide(tf: boolean) {
    this.onActive = tf;
  }

  private listStoreStatus() {
    this.metaService
      .listStoreStatus('1001')
      .then(res => {
        this.storeStatus = res
      })
      .catch(error => this.error = error);
  }
}
