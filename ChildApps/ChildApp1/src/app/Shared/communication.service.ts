import { Injectable, Optional } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  childConfig: any;
  receivedMessage: any;
  from: any;
  sendHeight () {
    var that = this;
    var body = document.body, html = document.documentElement;

    /*
    var height = Math.max( body.scrollHeight, body.offsetHeight, 
        html.clientHeight, html.scrollHeight, html.offsetHeight );
    console.debug('heights', body.scrollHeight, body.offsetHeight, 
    html.clientHeight, html.scrollHeight, html.offsetHeight);
    */

    var height = html.offsetHeight;
    //var height = 300;
    parent.postMessage({ message: 'set-height', appPath: that.childConfig.appId, height: height }, '*');
  }

  sendMessage(message: any, appId?: string) {
    parent.postMessage({ message: 'message-passed', appPath: this.childConfig.appId, content: message, to: appId }, '*');
  }

  notifyChanges(isUnsaved: boolean) {
    parent.postMessage({ message: 'unsavedChanges', appId: 'ServiceA', isUnsaved: isUnsaved }, '*');

  }

  config (config) {
    this.childConfig = config;
  }
  sendRoute (url) {
    parent.postMessage({ message: 'routed', appPath: this.childConfig.appId, route: url }, '*');
  }
  registerForRouteChange (callback) {
    window.addEventListener('message', (e) => {
      if (e.data && e.data.message === 'sub-route') {
        callback(e.data.route);
      }
      //to do
      else if (e.data && e.data.message === 'passedMessage') {
        this.receivedMessage = e.data.content;
        this.from = e.data.from;
      }
    }, true);
  }

  init () {
    if (!parent) return;
    window.addEventListener('load', this.sendHeight.bind(this), true);
    window.addEventListener('resize', this.sendHeight.bind(this), true);
  }

}
