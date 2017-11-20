import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';

import { DashboardComponent }    from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import {StoreListComponent} from "./store-list.component";
import {StoreDetailComponent} from "./store-detail.component";
import {DashboardHomeComponent} from "./dashboard-home.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DashboardRoutingModule
  ],
  declarations: [
    DashboardComponent,
    StoreListComponent,
    StoreDetailComponent,
    DashboardHomeComponent
  ],
  providers: [  ]
})
export class DashboardModule {}
