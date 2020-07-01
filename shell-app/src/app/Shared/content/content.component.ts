import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {FormControl} from '@angular/forms';

import { NavService } from '../Services/nav.service';
import { ShellCommService } from '../Services/shell-comm.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ContentComponent implements OnInit {
  title = 'metaR';
  tabs = [];
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
    if (this.tabs && !!res && this.tabs.indexOf(res.tabName) < 0 && !!res.tabName) {
      this.tabs.push(res.tabName);
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

}
