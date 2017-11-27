import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {salesCenterComponent} from './sales-center.component';


const salesCenterRoutes: Routes = [
  {
    path: 'sales-center',
    component: salesCenterComponent,

  }
];

@NgModule({
  imports: [
    RouterModule.forChild(salesCenterRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class salesCenterRoutingModule {
}
