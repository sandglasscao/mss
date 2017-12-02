import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {StoresOfflineComponent} from './stores-offline.component';

const StoresOfflineRoutes: Routes = [
  {
    path: 'stores-offline',
    component: StoresOfflineComponent,
    loadChildren: './stores-offline.module#StoresOfflineModule'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(StoresOfflineRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class StoresOfflineRoutingModule {
}
