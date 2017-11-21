import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DashboardComponent} from './dashboard.component';
import {DashboardHomeComponent} from "./dashboard-home.component";
import {StoreListComponent} from "./store-list.component";
import {StoreDetailComponent} from "./store-detail.component";

const salesRoutes: Routes = [
  {path: 'stores', component: StoreListComponent},
  {path: 'store', component: StoreDetailComponent}
  ];

@NgModule({
  imports: [
    RouterModule.forChild(salesRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardRoutingModule {
}
