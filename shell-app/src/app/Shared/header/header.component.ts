import { Component, OnInit, ViewChild, ElementRef, HostListener, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MediaMatcher } from '@angular/cdk/layout';
import { ShellCommService } from '../Services/shell-comm.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnDestroy {

  mobileQuery: MediaQueryList;
  isExpended: boolean = false;
  passedMessage: any;
  messageToSend: any;
  passedTo: any;
  passedToChild: any;
  // Sidemenu
  @ViewChild('snav') sidenav: MatSidenav;
  @ViewChild('outlet') outlet: ElementRef;
  private _mobileQueryListener: () => void;
    selectedItem: any;
  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (this.eRef.nativeElement.contains(event.target)) {
    } else {
      this.sidenav.close();
    }
  }


  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private eRef: ElementRef, private commService: ShellCommService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  toggle(path?: string, subRoute?: string) {
    if (!!path) {
      this.commService.go(path, subRoute);
    }
    this.sidenav.toggle();
    this.isExpended = this.sidenav.opened;
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }


  list = [
    {
      displayName: "top",
      children: [
        {
          displayName: "level1",
          children: [
            {
              displayName: "level2",
              children: []
            }
          ]
        }
      ]
    },
    {
      displayName: "bottom", children: [
        {
          displayName: "level1",
          children: [
            {
              displayName: "level2",
              children: []
            }
          ]
        }
      ]
    }
  ]

  listClick(event, newValue) {
    console.log(newValue);
    this.selectedItem = newValue;
    newValue.showSubfolders = !newValue.showSubfolders
    event.stopPropagation()
  }

}
