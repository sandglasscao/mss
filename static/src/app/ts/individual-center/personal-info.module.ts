import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';


import {PersonalInfoRoutingModule} from "./personal-info-routing.module";
import {PersonalInfoComponent} from "./personal-info.components";
import {ProfileService} from "./profile.service";
import {ChangePasswordComponent} from "./change-password.components";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PersonalInfoRoutingModule
  ],
  declarations: [
    ChangePasswordComponent,
    PersonalInfoComponent,

  ],
  providers: [ProfileService]
})
export class PersonalInfoModule {
}
