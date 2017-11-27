import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';


import {personalInfoRoutingModule} from "./personal-info-routing.module";
import {personalInfoComponent} from "./personal-info.components";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    personalInfoRoutingModule
  ],
  declarations: [
    personalInfoComponent,

  ],
  providers: []
})
export class personalInfoModule {
}
