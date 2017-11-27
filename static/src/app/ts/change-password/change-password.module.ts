import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';


import {changePasswordRoutingModule} from "./change-password-routing.module";
import {changePasswordComponent} from "./change-password.components";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    changePasswordRoutingModule
  ],
  declarations: [
    changePasswordComponent,

  ],
  providers: []
})
export class changePasswordModule {
}
