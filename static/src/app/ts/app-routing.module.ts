import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {PageNotFoundComponent} from './not-found.component';

const appRoutes: Routes = [
  {
    path: 'admin',
    loadChildren: 'ts/admin/admin.module#AdminModule'
  },
  {
    path: 'store-center',
    loadChildren: 'ts/store-center/stores.module#StoresModule'
  },
  {
    path:'change-password',
    loadChildren: 'ts/change-password/change-password.module#changePasswordModule'
  },
  {
    path: 'personal-info',
    loadChildren: 'ts/personal-info/personal-info.module#personInfoModule'
  },
  {
    path: 'sales-center',
    loadChildren: 'ts/sales-center/sales-center.module#salesCenterModule'
  },
  {
    path: 'dashboard',
    loadChildren: 'ts/dashboard/dashboard.module#DashboardModule'
  },
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
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
