import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ConsoleComponent} from "./console.component";
import {ConsoleRoutingModule} from "./console-routing.module";
import {CommissionComponent} from "./commission.component";
import {AgentNewComponent} from "./agent-new.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ConsoleRoutingModule,
  ],
  declarations: [
    ConsoleComponent,
    CommissionComponent,
    AgentNewComponent,
  ],
  providers: []
})
export class ConsoleModule {
}
