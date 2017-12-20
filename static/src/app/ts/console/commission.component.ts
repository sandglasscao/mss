import {Component, OnInit} from '@angular/core';
import {CommissionService} from "./commission.service";
import {Router} from "@angular/router";
import {Commission} from "./commission";

@Component({
  selector: 'cmmssn',
  templateUrl: '../../templates/console/commission.html',
  styleUrls: ['../../templates/console/commission.css'],
  providers: [CommissionService]
})
export class CommissionComponent implements OnInit {
  commission = new Commission();
  hasCommssion = false;

  error: any;

  constructor(private commissionService: CommissionService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.initCmmssn();
  }

  initCmmssn() {
    this.commissionService
      .getCmmssn()
      .then(res => {
        this.hasCommssion = (0 != res.length);
        this.commission = (0 != res.length) ? res[0] : this.commission;
      })
      .catch(error => {
        this.error = error;
      });
  }

  onSubmit() {
    if (this.hasCommssion) {
      this.commissionService.updateCmmssn(this.commission);
    } else {
      this.commissionService.createCmmssn(this.commission);
    }
    //should go back console home stay here instead of logout
    //this.router.navigate(['../']);
  }
}
