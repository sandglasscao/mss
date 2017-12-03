import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ConsoleComponent} from './console.component';
import {CommissionComponent} from "./commission.component";
import {AgentComponent} from "./agent.component";
import {ConsoleHomeComponent} from "./console-home.component";
import {InitSystemComponent} from "./init-system.component";

const consoleRoutes: Routes = [
  {
    path: 'console',
    component: ConsoleComponent,
    children: [
      {
        path: '',
        children: [
          {path: 'home', component: ConsoleHomeComponent},
          {path: 'agent-new', component: AgentComponent},
          {path: 'agent-main', component: AgentComponent},
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
