import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard.component';
import {RegisterComponent} from './register.component';
import {CellPhoneComponent} from './cellphone.component';
import {DashboardHomeComponent} from "./dashboard-home.component";
import {PasswordComponent} from "./password.components";
import {StoresComponent} from "./stores.component";
import {ProfileComponent} from "./profile.component";

const dashboardRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: '',
        children: [
          {path: 'register', component: RegisterComponent},
          {path: 'check-cell', component: CellPhoneComponent},
          {path: 'home', component: DashboardHomeComponent},
          {path: 'store', component: StoresComponent},
          {path: 'team', component: DashboardHomeComponent},
          {path: 'password', component: PasswordComponent},
          {path: 'profile', component: ProfileComponent},
          {path: '', redirectTo: 'home', pathMatch: 'full'},
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
