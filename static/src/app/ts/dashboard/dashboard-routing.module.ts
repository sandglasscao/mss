import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard.component';
import {DashboardHomeComponent} from "./dashboard-home.component";
import {PasswordComponent} from "./password.components";
import {StoresComponent} from "./stores.component";
import {StoreDetailComponent} from "./store-detail.component";
import {ProfileComponent} from "./profile.component";
import {TeamComponent} from "./team.component";
import {StoreCoordComponent} from "./storeCoord.component";
import {PreviewImgComponent} from "./previewImgFile.component";


const dashboardRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: '',
        children: [
          {path: 'home', component: DashboardHomeComponent},
          {path: 'store', component: StoresComponent},
          {path: 'store/:id', component: StoreDetailComponent},
          {path: 'storeCoord', component: StoreCoordComponent},
          {path: 'previewImgFile', component: PreviewImgComponent},
          {path: 'team', component: TeamComponent},
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
