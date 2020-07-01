import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NavService } from '../Services/nav.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {



  constructor(private navService: NavService) { }

  public selected = 'home';

  ngOnInit(): void {
  }

  openSideNav() {
    this.navService.openNav();
  }

  toggle() {
    if (this.selected != this.navService.featureSelected) {
      this.navService.featureSelected = this.selected;
      this.navService.openNav();
      
    }
    else {
      this.navService.toggle();;
    }
    
  }

}
