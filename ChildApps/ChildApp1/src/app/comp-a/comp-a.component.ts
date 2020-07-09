import { Component, OnInit } from '@angular/core';
import { CommunicationService } from '../Shared/communication.service';

@Component({
  selector: 'app-comp-a',
  templateUrl: './comp-a.component.html',
  styleUrls: ['./comp-a.component.scss']
})
export class CompAComponent implements OnInit {
  fullName: string = 'abc';
  constructor(public commService: CommunicationService) { }

  ngOnInit(): void {
  }
  messagePassed: string = '';
  passedTo: string = '';

  detectChange() {
    if (this.messagePassed.length > 0 || this.passedTo.length > 0) {
      this.commService.notifyChanges(true)
    }
    else {
      this.commService.notifyChanges(false);
    }
  }
  sendMessage() {
    this.commService.sendMessage(this.messagePassed, this.passedTo);
    this.commService.notifyChanges(false);
  }

}
