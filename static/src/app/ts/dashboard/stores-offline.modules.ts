import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {StoresOfflineComponent} from './stores-offline.component';
import {StoresOfflineRoutingModule} from './stores-offline-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    StoresOfflineRoutingModule
  ],
  declarations: [
    StoresOfflineComponent,
  ],
  providers: []
})
export class StoresOfflineModule {
}
