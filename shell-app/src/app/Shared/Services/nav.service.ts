import {EventEmitter, Injectable, ElementRef} from '@angular/core';
import {Event, NavigationEnd, Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';

@Injectable()
export class NavService {
  public appDrawer: MatSidenav;
  expanded: boolean = false;
  selectedChild: string = '';
  featureSelected: string = '';
  
  public currentUrl = new BehaviorSubject<string>(undefined);

  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl.next(event.urlAfterRedirects);
      }
    });
  }

  public closeNav() {
    this.expanded = false;
    this.appDrawer.close();
  }

  public openNav() {
    this.expanded = true;
    this.appDrawer.open();
  }

  async toggle() {
    var result = await this.appDrawer.toggle();
    if (result === 'open') {
      this.expanded = true;
    }
    else {
      this.expanded = false;
    }
  }
}
