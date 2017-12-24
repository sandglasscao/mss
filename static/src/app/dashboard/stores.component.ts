import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {Store} from "./store";
import {StoreService} from "./store.service";
import {MetaService} from "../meta/meta.service";
import {StoreStatus} from "./store-status";

@Component({
  selector: 'app-store',
  templateUrl: '../../assets/templates/dashboard/stores.html',
  styleUrls: ['../../assets/css/dashboard/stores.css']
})
export class StoresComponent implements OnInit {
  myStores;
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
    if (sessionStorage.getItem('getShow')) {
      sessionStorage.removeItem('getShow');
    }
  }

  goDetail(id) {
    sessionStorage.setItem('selected', id.toString());
    this.router.navigate([this.router.url, id]);
  }

  initStores() {
    this.storeService
      .listStore()
      .then(res => {
        this.myStores = res;
        let commStroes = this.myStores.filter(store => store.status == '2');
        this.commLen = commStroes.length;
        this.uncommLen = this.myStores.length - this.commLen;
        this.myStores.map(store => {
          store.status = this.statuslst.find(st => st.code == store.status).value
        });
        this.sortedStores = this.myStores;
        this.storeService.myStores = this.myStores;
      })
      .catch(error => {
        // this.error = error;
        this.error = "业务员不存在!"
      });
  }

  private listStoreStatus() {
    this.metaService
      .listStoreStatus('1001')
      .then(res => this.statuslst = res)
      .catch(error => this.error = error);
  }

  private filterStores(code: string) {
    let value = this.statuslst.find(status => status.code == code).value;
    this.sortedStores = this.myStores.filter(store => store.status == value);
  }
}
