// TODO SOMEDAY: Feature Componetized like CrisisCenter
import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

//import { Hero, HeroService }  from './hero.service';

@Component({
  templateUrl: 'static/src/app/templates/dashboard/store-list.html'
})
export class StoreListComponent implements OnInit {
  constructor(
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
  }
}
