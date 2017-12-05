import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {PageNotFoundComponent} from './not-found.component';
import {LoginComponent} from './login.component';
import {RegisterComponent} from './register.component';
import {CellPhoneComponent} from './cellphone.component';
import {CellPhoneResetComponent} from './cellphone-reset.component';
import {PasswordResetComponent} from './password-reset.component';
const appRoutes: Routes = [
  {
    path: 'console',
    loadChildren: 'ts/console/console.module#ConsoleModule'
  },
  {
    path: 'dashboard',
    loadChildren: 'ts/dashboard/dashboard.module#DashboardModule'
  },
  {path: 'check-cell', component: CellPhoneComponent},
  {path: 'cell-reset', component: CellPhoneResetComponent},
  {path: 'reset-pwd', component: PasswordResetComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {
        enableTracing: true, // <-- debugging purposes only

      }
    )
  ],
  exports: [
    RouterModule
  ],
  providers: []
})
export class AppRoutingModule {
}
