import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommunicationService } from './Shared/communication.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewChecked {
  title = 'app-c';

  constructor(private router: Router, private commService: CommunicationService) {
    this.initChildRouter();
  }
    ngAfterViewChecked(): void {
      this.commService.init();
    }
  ngOnInit(): void {
    this.commService.config({ appId: 'a' });
    
    }

  // Sync Subroutes
  initChildRouter() {
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe((e: NavigationEnd) => {
      this.commService.sendRoute(e.url);
      this.commService.sendHeight();
    });

    this.commService.registerForRouteChange(url => this.router.navigateByUrl(url));
  }

}
