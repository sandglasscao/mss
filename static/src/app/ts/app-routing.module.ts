import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {PageNotFoundComponent} from './not-found.component';

const appRoutes: Routes = [
  /*{
    path: 'admin',
    loadChildren: 'ts/admin/admin.module#AdminModule'
  },*/
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
