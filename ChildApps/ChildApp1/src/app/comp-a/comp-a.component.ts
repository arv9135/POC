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


  sendMessage() {
    this.commService.sendMessage(this.messagePassed, this.passedTo);
  }

}
