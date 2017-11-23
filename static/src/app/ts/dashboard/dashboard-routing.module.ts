import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DashboardComponent} from './dashboard.component';
import {DashboardHomeComponent} from "./dashboard-home.component";
import {StoreListComponent} from "./store-list.component";
import {StoreDetailComponent} from "./store-detail.component";
import {ProfileComponent} from "./profile.component";

const salesRoutes: Routes = [
  {path: 'profile', component: ProfileComponent},
  {path: 'stores', component: StoreListComponent},
  {path: 'store', component: StoreDetailComponent},
  {path: '', component: DashboardHomeComponent},
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
