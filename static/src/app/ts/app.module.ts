import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';

import {DashboardModule} from './dashboard/dashboard.module';
import {LoginRoutingModule} from './login-routing.module';
import {LoginComponent} from './login.component';
import {PageNotFoundComponent} from './not-found.component';
import {AdminModule} from "./admin/admin.module";
import {HttpModule} from "@angular/http";

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    AdminModule,
    DashboardModule,
    LoginRoutingModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    LoginComponent,
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
