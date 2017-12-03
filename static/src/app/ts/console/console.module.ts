import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ConsoleComponent} from "./console.component";
import {ConsoleRoutingModule} from "./console-routing.module";
import {CommissionComponent} from "./commission.component";
import {AgentComponent} from "./agent.component";
import {ConsoleHomeComponent} from "./console-home.component";
import {InitSystemComponent} from "./init-system.component";

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
    AgentComponent,
  ],
  providers: []
})
export class ConsoleModule {
}
