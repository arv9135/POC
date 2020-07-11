import { Component, OnInit, ChangeDetectorRef, ViewChild, HostListener, ElementRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { ShellCommService } from './Shared/Services/shell-comm.service';

/// <reference path="shared-worker\shared-worker.d.ts" />




// Type definitions for SharedWorker
// Project: http://www.w3.org/TR/workers/
// Definitions by: Toshiya Nakakura <https://github.com/nakakura>
//                 M. Boughaba <https://github.com/mboughaba>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 3.0

declare namespace SharedWorker {
  interface AbstractWorker extends EventTarget {
    onerror: (ev: ErrorEvent) => any;
  }

  export interface SharedWorker extends AbstractWorker {
    /**
     * the value it was assigned by the object's constructor.
     * It represents the MessagePort for communicating with the shared worker.
     * @type {MessagePort}
     */
    port: MessagePort;
  }

  export interface SharedWorkerGlobalScope extends Worker {
    onconnect: (event: MessageEvent) => void;
  }
}

interface SharedWorkerOptions {
  credentials?: RequestCredentials;
  name?: string;
  type?: WorkerType;
}

declare var SharedWorker: {
  prototype: SharedWorker.SharedWorker;

  /**
   *
   * @param {string} stringUrl                          Pathname to JavaScript file
   * @param {string|SharedWorkerOptions} [options]      Name of the worker to execute
   *                                                    or an object containing option properties
   */
  new(stringUrl: string, options?: string | SharedWorkerOptions): SharedWorker.SharedWorker;
};








@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

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
  dedicatedWorker: Worker;
  sharedWorker: SharedWorker.SharedWorker;
  sharedWorkerMessage: any;
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private eRef: ElementRef, public commService: ShellCommService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  ngOnInit(): void {
    if (typeof Worker !== 'undefined') {
      // Create a new
      //const sharedWorker = new SharedWorker('./app.worker', { type: 'module' })
      this.dedicatedWorker = new Worker('./app.worker', { type: 'module' });
      this.dedicatedWorker.onmessage = ({ data }) => {
        console.log(`page got message: ${data}`);
      };
        
    } else {
      // Web Workers are not supported in this environment.
      // You should add a fallback so that your program still executes correctly.
    }

    

    this.sharedWorker = new SharedWorker('/assets/shared-worker.worker.js');
    this.sharedWorker.port.onmessage = ({ data }) => {
      this.sharedWorkerMessage = data;
        console.log(data);
      };
      this.sharedWorker.port.start();
    }

  toggle(path?: string, subRoute?: string) {
    if (!!path) {
      //this.commService.go(path, subRoute);
    }
    this.sidenav.toggle();
    this.isExpended = this.sidenav.opened;
  }

  dedicatedWorkerPost() {
    this.dedicatedWorker.postMessage('hello');
  }

  sharedWorkerPost() {
    this.sharedWorker.port.postMessage('shared worker called.');
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


