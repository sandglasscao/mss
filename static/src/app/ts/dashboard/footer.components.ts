import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'footer-bar',
  templateUrl: 'static/src/app/templates/dashboard/footer.html',
  styleUrls: ['static/src/app/templates/dashboard/footer.css']
})
export class FooterComponent {
  @Output() changed = new EventEmitter();

  showProfile() {
    let result = {'isProfile': true};
    this.changed.emit(result);
  }
}


