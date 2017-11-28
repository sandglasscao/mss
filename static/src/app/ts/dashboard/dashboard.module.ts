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
import {StoresModule} from "./store-center/stores.module";
import {SalesCenterModule} from "./sales-center/sales-center.module";
import {FooterComponent} from "./footer.components";
import {DashboardHomeComponent} from "./dashboard-home.component";
import {PersonalInfoComponent} from "./profile.components";
import {ChangePasswordComponent} from "./change-password.components";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    StoresModule,
    SalesCenterModule,
    DashboardRoutingModule
  ],
  declarations: [
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    CheckCellphoneComponent,
    PersonalInfoComponent,
    ChangePasswordComponent,
    DashboardHomeComponent,
    FooterComponent,
  ],
  providers: [LoginService, RegisterService]
})
export class DashboardModule {
}
