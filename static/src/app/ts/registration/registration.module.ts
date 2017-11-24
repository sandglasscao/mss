import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from "@angular/forms";

import {RegistrationComponent} from './registration.component';
import {RegistrationRoutingModule} from './registration-routing.module';
import {CheckCellphoneComponent} from "./check-cellphone.component";
import {RegisterComponent} from "./register.component";
import {RegistraterService} from "./registrater.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RegistrationRoutingModule
  ],
  declarations: [
    RegistrationComponent,
    CheckCellphoneComponent,
    RegisterComponent
  ],
  providers: [
    RegistraterService,
  ]
})
export class RegistrationModule {
}
