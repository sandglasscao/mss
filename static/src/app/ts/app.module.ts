import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HttpModule} from "@angular/http";

import {DashboardModule} from './dashboard/dashboard.module';
import {PageNotFoundComponent} from './not-found.component';
import {Router} from "@angular/router";
import {StoresModule} from "./store-center/stores.module";
import {salesCenterModule} from "./sales-center/sales-center.module";
import {personalInfoModule} from "./personal-info/personal-info.module";
import {changePasswordModule} from "./change-password/change-password.module";
@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    //AdminModule,
    StoresModule,
    salesCenterModule,
    personalInfoModule,
    DashboardModule,
    changePasswordModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  // Diagnostic only: inspect router configuration
  constructor(router: Router) {
    console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
  }
}
