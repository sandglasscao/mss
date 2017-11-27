import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {PersonalInfoComponent} from './personal-info.components';


const personalInfoRouts: Routes = [
  {
    path: 'personal-info',
    component: PersonalInfoComponent,
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
export class PersonalInfoRoutingModule {
}
