// TODO SOMEDAY: Feature Componetized like CrisisCenter
import {Component, OnInit} from '@angular/core';
import {Store} from "./store";
import {StoreService} from "./store.service";
import {MetaService} from "../meta/meta.service";
import {StoreStatus} from "./store-status";
import {forEach} from "@angular/router/src/utils/collection";
import {Router} from "@angular/router";

@Component({
  selector: 'app-store',
  templateUrl: 'static/src/app/templates/dashboard/stores.html',
  styleUrls: ['static/src/app/templates/dashboard/stores.css'],
  providers: [StoreService]
})
export class StoresComponent implements OnInit {
  stores;
  sortedStores: Store[];
  statuslst;
  options: StoreStatus[];
  selectedStatus: string;
  commLen = 0;
  uncommLen = 0;
  error = null;

  constructor(private storeService: StoreService,
              private metaService: MetaService,
              private router: Router) {
  }


  ngOnInit(): void {
    this.listStoreStatus();
    this.initStores();
  }

  detail(id) {
    sessionStorage.setItem("detailId", id);
    this.router.navigate(['storeDetail']);
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
          store.status = this.statuslst.find(st => st.code == store.status).value
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
        this.statuslst = res;
        this.setOptions();
      })
      .catch(error => this.error = error);
  }

  private setOptions() {
    let allStore = new StoreStatus();
    allStore.code = '100';
    allStore.value = '全部';
    this.statuslst.push(allStore);
  }

  private filterStores(code: string) {
    let value = this.statuslst.find(status => status.code == code).value;
    this.sortedStores = this.stores.filter(store => store.status == value);
  }
}
