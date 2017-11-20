import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent }    from './dashboard.component';
import {DashboardHomeComponent} from "./dashboard-home.component";
import {StoreDetailComponent} from "./store-detail.component";
import {StoreListComponent} from "./store-list.component";

const salesRoutes: Routes = [{
  path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: StoreListComponent,
        children: [
          {
            path: ':id',
            component: StoreDetailComponent
          },
          {
            path: '',
            component: DashboardHomeComponent
          }
        ]
      }
    ]
}];

@NgModule({
  imports: [
    RouterModule.forChild(salesRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardRoutingModule { }
