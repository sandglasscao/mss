import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {DashboardComponent} from './dashboard.component';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {LoginComponent} from "./login.component";
import {RegisterComponent} from "./register.component";
import {CheckCellphoneComponent} from "./check-cellphone.component";
import {LoginService} from "./login.service";
import {RegisterService} from "./registrater.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DashboardRoutingModule
  ],
  declarations: [
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    CheckCellphoneComponent
  ],
  providers: [LoginService, RegisterService]
})
export class DashboardModule {
}
