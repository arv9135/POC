import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {FormControl} from '@angular/forms';

import { NavService } from '../Services/nav.service';
import { ShellCommService } from '../Services/shell-comm.service';
import { Tab } from '../Models/tab';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ContentComponent implements OnInit {
  title = 'metaR';
  tabs:Tab[] = [];
  constructor(private navService: NavService, private commService: ShellCommService) { }

  ngOnInit(): void {
    this.navService.selectedMenuItem.subscribe((data) => this.addTab(data));
    this.tabs=[];
  }

  ngAfterViewInit() {
    this.commService.init();
    
  }
  selected = new FormControl(0);

  addTab(res: any) {
    //styling
    if (this.tabs && !!res && !!res.tabName && !this.tabs.find(args => args.label == res.tabName)) {
      var tab = new Tab(res.tabName);
      tab.active = true;
      this.tabs.push(tab);
      this.selected.setValue(this.tabs.length - 1);

      setTimeout(args => {
        this.commService.go(res.tabName, res.route);
      }, 1000)
      //this.commService.go('b');
      //this.commService.preload(tabName);
    }
    else if (!!res) {
      this.selected.setValue(this.tabs.indexOf(res.tabName));
    }
      
  }

  removeTab(index: number) {
    event.stopPropagation();
    this.tabs.splice(index, 1);
  }

  tabChanged($event) {
    console.log($event);
    if (!!$event) {
      for (const ttab of this.tabs) {
        ttab.active = false;
      }
      this.tabs[$event.index].active = true;
    }
    
  }

}
