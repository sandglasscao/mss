import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HttpModule} from "@angular/http";

import {PageNotFoundComponent} from './not-found.component';
import {MetaService} from "./meta/meta.service";
import {LoginRoutingModule} from "./login-routing.module";
import {LoginComponent} from "./login.component";
import {ProfileService} from "./dashboard/profile.service";
import {DashboardModule} from "./dashboard/dashboard.module";
import {ConsoleModule} from "./console/console.module";
import {RegisterComponent} from "./register.component";
import {RegisterService} from "./registrater.service";
import {CellPhoneComponent} from "./cellphone.component";
import {CellPhoneResetComponent} from './cellphone-reset.component';
import {PasswordResetComponent} from './password-reset.component';
@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    DashboardModule,
    ConsoleModule,
    LoginRoutingModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    CellPhoneComponent,
    CellPhoneResetComponent,
    PasswordResetComponent,
    RegisterComponent,
    LoginComponent,
    PageNotFoundComponent
  ],
  providers: [MetaService, ProfileService, RegisterService],
  bootstrap: [AppComponent]
})
export class AppModule {
  // Diagnostic only: inspect router configuration
  /*constructor(router: Router) {
    console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
  }*/
}
