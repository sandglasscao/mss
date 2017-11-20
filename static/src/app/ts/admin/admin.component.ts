import { Component } from '@angular/core';

@Component({
  template:  `
    <h3>ADMIN</h3>
    <nav>
      <a routerLink="./admin" routerLinkActive="active">System Admin</a>
      <a routerLink="./dashboard" routerLinkActive="active">Sales Center</a>
    </nav>
    <router-outlet></router-outlet>
  `
})
export class AdminComponent {
}
