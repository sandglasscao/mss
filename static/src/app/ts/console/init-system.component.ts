import {Component} from '@angular/core';
import {SyncService} from "./init-system.service";

@Component({
  selector: 'app-sync',
  templateUrl: 'static/src/app/templates/console/sync-data.html',
  providers: [SyncService]
})
export class InitSystemComponent {
  error: null;

  constructor(private syncService: SyncService) {
  }

  initSystem() {
    this.syncService
      .initSystem()
      .catch(error => this.error = error);
  }

}
