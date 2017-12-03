import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ConsoleComponent} from './console.component';
import {CommissionComponent} from "./commission.component";
import {AgentNewComponent} from "./agent-new.component";

const consoleRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        children: [
          {path: 'console', component: ConsoleComponent},
          {path: 'agnt-new', component: AgentNewComponent},
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
