import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {SalesCenterComponent} from './sales-center.component';


const salesCenterRoutes: Routes = [
  {
    path: 'sales-center',
    component: SalesCenterComponent,

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
export class SalesCenterRoutingModule {
}
