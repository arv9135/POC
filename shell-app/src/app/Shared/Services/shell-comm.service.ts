import { Injectable, Optional } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAppConfig } from '../Models/AppConfig';

@Injectable({
  providedIn: 'root'
})
export class ShellCommService {
  additionalConfig: { hashPrefix: '/' };
  passedMessage: any;
  passedTo: any;
  activatedRoute: null;
  config: IAppConfig[];
  configure(config: any) { this.config = config };
  init() {
    window.addEventListener('hashchange', this.routeByUrl.bind(this), false);
    window.addEventListener('message', this.handleMessage.bind(this), false);
    if (!location.hash && this.config && this.config.length > 0) {
      var defaultRoute = this.config[0];
      this.go(defaultRoute.path);
    }
    else {
      this.routeByUrl();
    }
  }
  handleMessage(event) {
    if (!event.data) return;

    if (event.data.message == 'routed') {
      this.setRouteInHash(event.data.appPath, event.data.route);
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
  }
  resizeIframe(appPath, height) {
    let iframe = document.getElementById(appPath);
    if (!iframe) return;
    height = height + 20;
    iframe.style.height = height + 'px';
    //iframe.style.height = '100%';
    iframe.style.width = '100%';
    iframe.style.backgroundColor = '#C0C0C0'
  }
  go(path?: any, subRoute?: any) {
    var route = this.config.find(function (route) {
      return route.path === path;
    });
    if (!route) throw Error('route not found: ' + route);

    this.ensureIframeCreated(route, subRoute);
    this.activateRoute(route, subRoute);
  }
  ensureIframeCreated(route?: any, subRoute?: any) {
    if (!this.getIframe(route)) {

      var url = '';

      if (subRoute) {
        url = route.app + '#' + this.additionalConfig.hashPrefix + subRoute;
      }
      else {
        url = route.app;
      }

      var iframe = document.createElement('iframe');
      iframe.style['display'] = 'none';
      iframe.src = url;
      iframe.id = route.path;
      iframe.className = 'outlet-frame';

      let outlet = this.getOutlet();
      if (!outlet) throw new Error('outlet not found');

      outlet.appendChild(iframe);
    }
  }
  activateRoute(routeToActivate, subRoute) {
    var that = this;
    this.config.forEach(function (route) {
      var iframe = that.getIframe(route);
      if (iframe) {
        iframe.style['display'] = route === routeToActivate ? 'block' : 'none';
      }
    });

    if (subRoute) {
      var activatedIframe = this.getIframe(routeToActivate);
      activatedIframe.contentWindow.postMessage({ message: 'sub-route', route: subRoute }, '*');
    }

    this.setRouteInHash(routeToActivate.path, subRoute);
    this.activatedRoute = routeToActivate;
  }

  setRouteInHash(path, subRoute) {

    if (subRoute && subRoute.startsWith('/')) {
      subRoute = subRoute.substr(1);
    }

    var hash = '';

    if (subRoute) {
      hash = path + '/' + subRoute;
    }
    else {
      hash = path;
    }
    history.replaceState(null, null, document.location.pathname + '#' + hash);
  }


  getIframe(route) {
    return document.getElementById(route.path) as HTMLIFrameElement;
  }

  getOutlet() {
    return document.getElementById('outlet');
  }
  routeByUrl() {
    if (!location.hash) return;
    var path = location.hash.substr(1);
    if (!path) return;
    var segments = path.split('/');
    var appPath = segments[0];
    var rest = segments.slice(1).join('/');
    this.go(appPath, rest);
  }

  preload() {
    var that = this;
    this.config.forEach(function (route) {
      that.ensureIframeCreated(route);
    })
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
