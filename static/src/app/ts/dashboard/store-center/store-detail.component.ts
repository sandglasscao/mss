import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

//import { Hero, HeroService }  from './hero.service';

@Component({
  templateUrl: 'static/src/app/templates/dashboard/store-center/store-detail.html'
})
export class StoreDetailComponent implements OnInit {


  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {

  }

}
