import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DashboardComponent} from './dashboard.component';
import {LoginComponent} from "./login.component";
import {RegisterComponent} from "./register.component";
import {CheckCellphoneComponent} from "./check-cellphone.component";

const dashboardRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        children: [
          {path: 'login', component: LoginComponent},
          {path: 'register', component: RegisterComponent},
          {path: 'check-cell', component: CheckCellphoneComponent},
          {path: 'dashboard', component: DashboardComponent},
          {path: '', redirectTo: 'dashboard', pathMatch: 'full'}
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(dashboardRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardRoutingModule {
}
