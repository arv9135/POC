import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {FormControl} from '@angular/forms';

import { NavService } from '../Services/nav.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ContentComponent implements OnInit {
  title = 'metaR';

  tabs = [];
  constructor(private navService: NavService) { }

  ngOnInit(): void {
    this.navService.selectedMenuItem.subscribe((data) => this.addTab(data));
    this.tabs=[];
  }

 
  selected = new FormControl(0);

  addTab(tabName: string, selectAfterAdding= true) {
    //styling
    if(this.tabs && this.tabs.indexOf(tabName) < 0){
      this.tabs.push(tabName);
      this.selected.setValue(this.tabs.length - 1);
    }
    else
      this.selected.setValue(this.tabs.indexOf(tabName));
  }

  removeTab(index: number) {
    event.stopPropagation();
    this.tabs.splice(index, 1);
  }

}
