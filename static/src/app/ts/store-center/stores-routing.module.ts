import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {StoresComponent} from './stores.component';
import {StoreDetailComponent} from "./store-detail.component";
import {StoreListComponent} from "./store-list.component";

const storesRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        children: [
          {path: 'stores', component: StoreListComponent},
          {path: 'store-detail', component: StoreDetailComponent},
          {path: 'store-center', component: StoresComponent}
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(storesRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class StoresRoutingModule {
}
