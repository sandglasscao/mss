import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  templateUrl: 'static/src/app/templates/console/console.html'
})
export class ConsoleComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    let isLogin = sessionStorage.getItem('isLogin');
    if (!isLogin) {
      this.router.navigate(['/login']);
    }
  }

}
