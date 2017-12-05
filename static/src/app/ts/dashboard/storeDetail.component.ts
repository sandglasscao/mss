import {Component} from '@angular/core';


@Component({
  selector: 'app-teamDownLine',
  templateUrl: 'static/src/app/templates/dashboard/storeDetail.html',
  styleUrls: ['static/src/app/templates/dashboard/storeDetail.css']
})
export class StoreDetailComponent {
  storeName;
  constructor(private location: Location) {
  }
  ngOnInit(): void {
    this.storeName = sessionStorage.getItem("detailId");
  }
}
