import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {DashboardComponent} from './dashboard.component';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {RegisterComponent} from './register.component';
import {CellPhoneComponent} from './cellphone.component';
import {RegisterService} from './registrater.service';
import {DashboardHomeComponent} from './dashboard-home.component';
import {ProfileComponent} from './profile.component';
import {PasswordComponent} from './password.components';
import {StoresComponent} from "./stores.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DashboardRoutingModule,
  ],
  declarations: [
    DashboardComponent,
    RegisterComponent,
    CellPhoneComponent,
    ProfileComponent,
    PasswordComponent,
    DashboardHomeComponent,
    StoresComponent,
  ],
  providers: [RegisterService]
})
export class DashboardModule {
}
