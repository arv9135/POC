import { Injectable, Optional, SecurityContext, HostListener, RendererFactory2, Renderer2, ElementRef, Inject } from '@angular/core';
import { IAppConfig } from '../Models/AppConfig';
import { Applications } from '../Models/applications';
import { DomSanitizer } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ShellCommService {
  additionalConfig: { hashPrefix: '/' };
  passedMessage: any;
  passedTo: any;
  activatedRoute: null;
  config: IAppConfig[] = Applications;
  isUnsaved: { [appId: string]: boolean } = {};
  renderer: Renderer2;


  // Connect to the channel named "my_bus".
  channel = new BroadcastChannel('my_bus');

  //// Send a message on "my_bus".
  //channel.postMessage('This is a test message.');

  //// Listen for messages on "my_bus".
  //channel.onmessage = function (e) {
  //  console.log('Received', e.data);
  //};

  //// Close the channel when you're done.
  //channel.close();

  broadcastedMessage:any;
  constructor(
    private sanitizer: DomSanitizer, @Inject(DOCUMENT) private dom, private rendererFactory2: RendererFactory2
  ) {
    this.renderer = this.rendererFactory2.createRenderer(null, null);
    this.renderer.listen('window', 'message', (evt) => {
      this.handleMessage(evt);
      this.channel.addEventListener('message', ev => {
        this.broadcastedMessage = ev.data;
        console.log(ev.data);
      });
    });
  }

  broadCast(message: string) {
    this.channel.postMessage(message);
  }
  handleMessage(event) {
    if (!event.data) {
      return;
    } 

    else if (event.data.message == 'set-height') {
      this.resizeIframe(event.data.appPath, event.data.height);
    }
    else if (event.data.message == 'message-passed') {
      //to do
      this.passedMessage = event.data.content;
      this.passedTo = event.data.to;
      this.sendMessage(event.data.content, event.data.to);
    }
    else if (event.data.message == 'unsavedChanges') {
      //to do
      this.isUnsaved[event.data.appId] = event.data.isUnsaved;
    }
  }
  resizeIframe(appPath, height) {
    let iframe = this.dom.getElementById(appPath);
    if (!iframe) return;
    height = height + 30;
    iframe.style.height = height + 'px';
    iframe.style.width = '100%';
    iframe.style.border = 'none';
  }
  go(outletId:string, path?: any, subRoute?: any) {
    var route = this.config.find(args => args.path == path);
    if (!route) throw Error('route not found: ' + route);

    this.ensureIframeCreated(outletId, route, subRoute);
    //this.activateRoute(route, subRoute);
  }
  ensureIframeCreated(outletId:string, route?: any, subRoute?: any) {
    if (!this.getIframe(route)) {

      var url = '';

      if (subRoute) {
        url = route.app + '#' + this.additionalConfig.hashPrefix + subRoute;
      }
      else {
        url = route.app;
      }

      var iframe = this.dom.createElement('iframe');
      iframe.style['display'] = 'none';
      var abc = this.sanitizer.bypassSecurityTrustResourceUrl(url);
      //var abc = this.sanitizer.sanitize(SecurityContext.RESOURCE_URL, this.sanitizer.bypassSecurityTrustResourceUrl(url));
 
      iframe.src = `${url} | safe`; 
      iframe.id = route.path;
      iframe.style['display'] = 'block';
      iframe.allowFullscreen = true;
      iframe.className = 'outlet-frame';
      iframe.style.height = '100%';
      iframe.style.width = '100%';
      iframe.style.border = 'none';

      let outlet = this.getOutlet(outletId);
      if (!outlet) throw new Error('outlet not found');

      outlet.appendChild(iframe);
    }
  }
  activateRoute(routeToActivate, subRoute) {
    var that = this;
    this.config.forEach(function (route) {
      var iframe = that.getIframe(route);
      if (iframe) {
        //iframe.style['display'] = route === routeToActivate ? 'block' : 'none';
      }
    });

    if (subRoute) {
      var activatedIframe = this.getIframe(routeToActivate);
      activatedIframe.contentWindow.postMessage({ message: 'sub-route', route: subRoute }, '*');
    }

    //this.setRouteInHash(routeToActivate.path, subRoute);
    this.activatedRoute = routeToActivate;
  }

  //setRouteInHash(path, subRoute) {

  //  if (subRoute && subRoute.startsWith('/')) {
  //    subRoute = subRoute.substr(1);
  //  }

  //  var hash = '';

  //  if (subRoute) {
  //    hash = path + '/' + subRoute;
  //  }
  //  else {
  //    hash = path;
  //  }
  //  history.replaceState(null, null, document.location.pathname + '#' + hash);
  //}


  getIframe(route) {
    return this.dom.getElementById(route.path) as HTMLIFrameElement;
  }

  getOutlet(outletId) {
    return this.dom.getElementById(outletId);
  }
  routeByUrl(outletId:string) {
    if (!location.hash) return;
    var path = location.hash.substr(1);
    if (!path) return;
    var segments = path.split('/');
    var appPath = segments[0];
    var rest = segments.slice(1).join('/');
    this.go(outletId, appPath, rest);
  }

  sendMessage(message: any, from: any) {
    var app = this.getConfig(from);
    if (!!app) {
      var activatedIframe = this.getIframe(app);
      activatedIframe.contentWindow.postMessage({ message: 'passedMessage', from: from, content: message }, '*');

    }
    
  }

  getConfig(appId: string) {
    var app = this.config.filter(x => x.path === appId);
    if (app.length > 0) {
      return app[0];
    }

  }
}
