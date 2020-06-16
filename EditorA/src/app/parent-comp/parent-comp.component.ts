import { Component, OnInit } from '@angular/core';
import { PopUpComponent } from '../pop-up/pop-up.component';
import { MatDialogRef, MatDialogConfig, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-parent-comp',
  templateUrl: './parent-comp.component.html',
  styleUrls: ['./parent-comp.component.scss']
})
export class ParentCompComponent implements OnInit {
  dialogRefCard: MatDialogRef<PopUpComponent>;
  config: MatDialogConfig = {
    height: '83vh',
    width: '80vw'
  };
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }
  popup() {
    const dialogRef = this.dialog.open(PopUpComponent, this.config);
  }
}
