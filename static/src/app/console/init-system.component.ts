import {Component} from '@angular/core';
import {SyncService} from "./init-system.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sync',
  templateUrl: '../../assets/templates/console/sync-data.html',
  styleUrls: ['../../assets/css/console/sync-data.css'],
  providers: [SyncService]
})
export class InitSystemComponent {
  msg = "";

  constructor(private syncService: SyncService,
              private router: Router) {
  }

  initSystem() {
    this.msg = null;
    this.syncService
      .initSystem()
      .then(res => {
        this.msg = "同步成功";
      })
      .catch(error => {
        this.msg = "同步失败!"
      });
  }

}
