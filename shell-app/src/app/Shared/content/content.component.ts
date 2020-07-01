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

  constructor(private navService: NavService) { }

  ngOnInit(): void {
    this.navService.selectedMenuItem.subscribe((data) => this.addTab(data))
  }

  title = 'metaR';

  tabs = [];
  selected = new FormControl(0);

  addTab(tabName: string, selectAfterAdding= true) {
    this.tabs.push(tabName);

    if (selectAfterAdding) {
      this.selected.setValue(this.tabs.length - 1);
    }
  }

  removeTab(index: number) {
    event.stopPropagation();
    this.tabs.splice(index, 1);
  }

}
