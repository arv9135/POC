import { Component, OnInit, ChangeDetectorRef, ViewChild, HostListener, ElementRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { ShellCommService } from './Shared/Services/shell-comm.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  mobileQuery: MediaQueryList;
  isExpended: boolean = false;
  passedMessage: any;
  messageToSend: any;
  passedTo: any;
  passedToChild: any;
  // Sidemenu
  @ViewChild('snav') sidenav: MatSidenav;
  @ViewChild('outlet') outlet: ElementRef;
  private _mobileQueryListener: () => void;


  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private eRef: ElementRef, public commService: ShellCommService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  toggle(path?: string, subRoute?: string) {
    if (!!path) {
      //this.commService.go(path, subRoute);
    }
    this.sidenav.toggle();
    this.isExpended = this.sidenav.opened;
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  title = 'shell-app';

  getMessage() {
    this.passedMessage = this.commService.passedMessage;
    this.passedTo = this.commService.passedTo;
  }

  sendMessage() {
    this.commService.sendMessage(this.messageToSend, this.passedToChild);
  }

  broadcast() {
    this.commService.broadCast(this.messageToSend);
  }

}
