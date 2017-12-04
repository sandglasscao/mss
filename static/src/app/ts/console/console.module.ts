import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ConsoleComponent} from "./console.component";
import {ConsoleRoutingModule} from "./console-routing.module";
import {CommissionComponent} from "./commission.component";
import {AgentNewComponent} from "./agent-new.component";
import {ConsoleHomeComponent} from "./console-home.component";
import {InitSystemComponent} from "./init-system.component";
import {AgentMainComponent} from "./agent-main.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ConsoleRoutingModule,
  ],
  declarations: [
    ConsoleComponent,
    ConsoleHomeComponent,
    CommissionComponent,
    InitSystemComponent,
    AgentMainComponent,
    AgentNewComponent,
  ],
  providers: []
})
export class ConsoleModule {
}
