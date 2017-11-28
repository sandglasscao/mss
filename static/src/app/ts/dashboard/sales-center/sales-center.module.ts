import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {SalesCenterRoutingModule} from "./sales-center-routing.module";
import {SalesCenterComponent} from "./sales-center.component";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SalesCenterRoutingModule
  ],
  declarations: [
    SalesCenterComponent,

  ],
  providers: []
})
export class SalesCenterModule {
}
