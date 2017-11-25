import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {StoreListComponent} from "./store-list.component";
import {StoresRoutingModule} from "./stores-routing.module";
import {StoresComponent} from "./stores.component";
import {StoreDetailComponent} from "./store-detail.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    StoresRoutingModule
  ],
  declarations: [
    StoresComponent,
    StoreListComponent,
    StoreDetailComponent
  ],
  providers: []
})
export class StoresModule {
}
