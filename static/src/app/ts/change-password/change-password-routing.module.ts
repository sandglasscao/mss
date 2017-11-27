import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {changePasswordComponent} from './change-password.components';


const changePasswordRouts: Routes = [
  {
    path: 'change-password',
    component: changePasswordComponent,

  }
];

@NgModule({
  imports: [
    RouterModule.forChild(changePasswordRouts)
  ],
  exports: [
    RouterModule
  ]
})
export class changePasswordRoutingModule {
}
