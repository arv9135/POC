import { Component, OnInit, ViewEncapsulation, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';

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
  tabs: Tab[] = [];
  go: boolean;
  resssss: any;
  isUnsaved: boolean = true;
  constructor(private navService: NavService, public commService: ShellCommService, private cdRef: ChangeDetectorRef) { }
  ngAfterViewChecked(): void {
    if (this.go) {
      this.commService.go(this.resssss.tabName, this.resssss.route);
      this.go = false;
    }
    this.cdRef.detectChanges();
  }

  ngOnInit(): void {
    this.navService.selectedMenuItem.subscribe((data) => this.addTab(data));
    this.tabs = [];
  }
  selected = new FormControl(0);

  addTab(res: any) {
    //styling
    if (this.tabs && !!res && this.tabs.indexOf(res.tabName) < 0 && !!res.tabName && !this.tabs.find(args => args.label == res.tabName)) {

      var tab = new Tab(res.tabName);
      tab.active = true;
      this.tabs.push(tab);
      this.selected.setValue(this.tabs.length - 1);
      this.resssss = res;
      this.go = true;
    }
    else if (!!res) {
      let index = this.tabs.indexOf(this.tabs.find(args => args.label == res.tabName));
      this.selected.setValue(index);

      this.tabChanged({ index: index })
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
