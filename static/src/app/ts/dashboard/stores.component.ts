// TODO SOMEDAY: Feature Componetized like CrisisCenter
import {Component, OnInit} from '@angular/core';
import {Store} from "./store";
import {StoreService} from "./store.service";
import {MetaService} from "../meta/meta.service";
import {StoreStatus} from "./store-status";
import {forEach} from "@angular/router/src/utils/collection";

@Component({
  selector: 'app-store',
  templateUrl: 'static/src/app/templates/dashboard/stores.html',
  styleUrls: ['static/src/app/templates/dashboard/stores.css'],
  providers: [StoreService]
})
export class StoresComponent implements OnInit {
  stores;
  sortedStores: Store[];
  storeStatus;
  options: StoreStatus[];
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
          store.status = this.storeStatus.find(st => st.code == store.status).value
        });
        this.sortedStores = this.stores;
      })
      .catch(error => {
        // this.error = error;
        this.error = "业务员不存在!"
      });
  }

  private listStoreStatus() {
    this.metaService
      .listStoreStatus('1001')
      .then(res => {
        this.storeStatus = res
        this.setOptions();
      })
      .catch(error => this.error = error);
  }

  private setOptions() {
    let allStore = new StoreStatus();
    allStore.code = '100';
    allStore.value = '全部';
    this.storeStatus.append(allStore);
  }

  private filterStores(status: string) {
    this.sortedStores = this.stores.filter(store => store.status == status);
  }
}