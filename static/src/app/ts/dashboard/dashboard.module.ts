import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {DashboardComponent} from './dashboard.component';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardHomeComponent} from './dashboard-home.component';
import {ProfileComponent} from './profile.component';
import {PasswordComponent} from './password.components';
import {StoresComponent} from "./stores.component";
import {TeamComponent} from "./team.component";
import {StoreDetailComponent} from "./storeDetail.component";
import {MetaService} from "../meta/meta.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DashboardRoutingModule,
  ],
  declarations: [
    DashboardComponent,
    ProfileComponent,
    PasswordComponent,
    DashboardHomeComponent,
    StoresComponent,
    TeamComponent,
    StoreDetailComponent
  ],
  providers: [MetaService]
})
export class DashboardModule {
}
