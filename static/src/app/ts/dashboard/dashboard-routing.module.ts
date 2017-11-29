import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard.component';
import {LoginComponent} from './login.component';
import {RegisterComponent} from './register.component';
import {CellPhoneComponent} from './cellphone.component';
import {StoresOfflineComponent} from './stores-offline.components';

const dashboardRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        children: [
          {path: 'login', component: LoginComponent},
          {path: 'register', component: RegisterComponent},
          {path: 'check-cell', component: CellPhoneComponent},
          {path: 'dashboard', component: DashboardComponent},
          {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
          {path: 'stores-offline', component: StoresOfflineComponent}
        ]
      }
    ],
  },
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
