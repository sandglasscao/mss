import 'rxjs/add/operator/switchMap';
import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

import {Hero, HeroService} from './hero.service';

@Component({
  template: `
    <h2>HEROES</h2>
    <div *ngIf="hero$ | async as hero">
      <h3>"{{ hero.name }}"</h3>
      <div>
        <label>Id: </label>{{ hero.id }}
      </div>
      <div>
        <label>Name: </label>
        <input [(ngModel)]="hero.name" placeholder="name"/>
      </div>
      <p>
        <button (click)="gotoHeroes(hero)">Back</button>
      </p>
    </div>
  `
})
export class HeroDetailComponent implements OnInit {

  hero$: Observable<Hero>;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private service: HeroService) {
  }

  ngOnInit() {
    this.hero$ = this.route.paramMap
      .switchMap((params: ParamMap) =>
        this.service.getHero(params.get('id')));
  }

  gotoHeroes(hero: Hero) {
    let heroId = hero ? hero.id : null;
    // Pass along the hero id if available
    // so that the HeroList component can select that hero.
    // Include a junk 'foo' property for fun.
    this.router.navigate(['/heroes', {id: heroId, foo: 'foo'}]);
  }
}
