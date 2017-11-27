import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';


import {salesCenterRoutingModule} from "./sales-center-routing.module";
import {salesCenterComponent} from "./sales-center.component";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    salesCenterRoutingModule
  ],
  declarations: [
    salesCenterComponent,

  ],
  providers: []
})
export class salesCenterModule {
}
