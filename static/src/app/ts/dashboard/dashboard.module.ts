import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {DashboardComponent} from './dashboard.component';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {LoginComponent} from "./login.component";
import {RegisterComponent} from "./register.component";
import {CellPhoneComponent} from "./cellphone.component";
import {LoginService} from "./login.service";
import {RegisterService} from "./registrater.service";

import {FooterComponent} from "./footer.components";
import {DashboardHomeComponent} from "./dashboard-home.component";
import {PersonalInfoComponent} from "./profile.components";
import {PasswordComponent} from "./password.components";
import {StoresComponent} from "./stores.componet";
import {TeamComponent} from "./team.component";
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
    CellPhoneComponent,
    PersonalInfoComponent,
    PasswordComponent,
    DashboardHomeComponent,
    StoresComponent,
    TeamComponent,
    FooterComponent,
  ],
  providers: [LoginService, RegisterService]
})
export class DashboardModule {
}
