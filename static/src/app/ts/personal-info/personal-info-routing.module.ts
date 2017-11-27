import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {personalInfoComponent} from './personal-info.components';


const personalInfoRouts: Routes = [
  {
    path: 'personal-info',
    component: personalInfoComponent,

  }
];

@NgModule({
  imports: [
    RouterModule.forChild(personalInfoRouts)
  ],
  exports: [
    RouterModule
  ]
})
export class personalInfoRoutingModule {
}
