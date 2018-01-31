import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ConsoleComponent} from "./console.component";
import {ConsoleRoutingModule} from "./console-routing.module";
import {CommissionComponent} from "./commission.component";
import {AgentNewComponent} from "./agent-new.component";
import {ConsoleHomeComponent} from "./console-home.component";
import {AgentMainComponent} from "./agent-main.component";
import {AgentService} from "./agent.service";

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
    AgentMainComponent,
    AgentNewComponent,
  ],
  providers: [AgentService]
})
export class ConsoleModule {
}
