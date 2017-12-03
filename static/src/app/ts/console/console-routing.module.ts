import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ConsoleComponent} from './console.component';
import {CommissionComponent} from "./commission.component";
import {AgentComponent} from "./agent.component";

const consoleRoutes: Routes = [
  {
    path: 'console',
    children: [
      {
        path: '',
        children: [
          {path: 'console', component: ConsoleComponent},
          {path: 'agnt', component: AgentComponent},
          {path: 'cmmssn', component: CommissionComponent},
          {path: '', redirectTo: '/console', pathMatch: 'full'}
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
