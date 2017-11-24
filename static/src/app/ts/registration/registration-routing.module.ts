import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CheckCellphoneComponent} from "./check-cellphone.component";
import {RegisterComponent} from "./register.component";

const regstrRoutes: Routes = [
  {path: 'rgstr', component: RegisterComponent},
  {path: 'check-cell', component: CheckCellphoneComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(regstrRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: []
})
export class RegistrationRoutingModule {
}
