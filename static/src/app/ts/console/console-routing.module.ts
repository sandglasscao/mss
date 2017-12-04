import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ConsoleComponent} from './console.component';
import {CommissionComponent} from "./commission.component";
import {AgentNewComponent} from "./agent-new.component";
import {ConsoleHomeComponent} from "./console-home.component";
import {InitSystemComponent} from "./init-system.component";
import {AgentMainComponent} from "./agent-main.component";

const consoleRoutes: Routes = [
  {
    path: 'console',
    component: ConsoleComponent,
    children: [
      {
        path: '',
        children: [
          {path: 'home', component: ConsoleHomeComponent},
          {path: 'agent-new', component: AgentNewComponent},
          {path: 'agent-main', component: AgentMainComponent},
          {path: 'cmmssn', component: CommissionComponent},
          {path: 'sync', component: InitSystemComponent},
          {path: '', redirectTo: 'home', pathMatch: 'full'}
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(consoleRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ConsoleRoutingModule {
}
