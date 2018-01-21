import {Component, OnInit} from '@angular/core';
import {CommissionService} from "./commission.service";
import {Router} from "@angular/router";
import {Commission} from "./commission";

@Component({
  selector: 'cmmssn',
  templateUrl: '../../assets/templates/console/commission.html',
  styleUrls: ['../../assets/css/console/commission.css'],
  providers: [CommissionService]
})
export class CommissionComponent implements OnInit {
  commission = new Commission();
  hasCommssion = false;

  error = null;

  constructor(private commissionService: CommissionService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.initCmmssn();
  }

  initCmmssn() {
    this.commissionService
      .getCmmssn()
      .subscribe(
        res => {
          this.hasCommssion = (0 != res.length);
          this.commission = (0 != res.length) ? res[0] : this.commission;
        },
        error => this.error = error
      );
  }

  onSubmit() {
    if (this.hasCommssion) {
      this.commissionService.updateCmmssn(this.commission)
        .subscribe(
          res => this.commission = res,
          error => this.error
        );
    } else {
      this.commissionService.createCmmssn(this.commission)
        .subscribe(
          res => this.commission = res,
          error => this.error
        );
    }
  }
}
