// TODO SOMEDAY: Feature Componetized like CrisisCenter
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'home-team',
  templateUrl: 'static/src/app/templates/dashboard/sales-center.html',
  styleUrls: ['static/src/app/templates/dashboard/sales-center.css']
})
export class TeamComponent implements OnInit {
  constructor(private router: Router) {
  }
  items = [
    "北京大兴区富康路188号",
    "北京大兴区富康路187号",
    "北京大兴区富康路158号",
    "北京大兴区xinhua158号",
    "北京海淀区唐家岭路356号",
    "北京朝阳区唐新芳路79号",
    "北京大兴区唐北兴路179号",
    "北京海淀区唐家岭路35号",
    "北京朝阳区唐新芳路752号",
    "北京大兴区唐北兴路19号",
    "北京海淀区唐家岭路56号",
    "北京朝阳区唐新芳路70号",
    "北京大兴区唐北兴路79号"
  ];
  onActive = true;
  decide(tf: boolean) {
    this.onActive = tf;
  }
  ngOnInit(): void {
    let isLogin = sessionStorage.getItem('isLogin');
    if (!isLogin) {
      this.router.navigate(['/login']);
    }
  }
}
