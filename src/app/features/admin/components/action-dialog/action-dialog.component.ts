import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-action-dialog',
  templateUrl: './action-dialog.component.html',
  styleUrls: ['./action-dialog.component.scss'],
})
export class ActionDialogComponent {
  constructor(public dialogRef: MatDialogRef<ActionDialogComponent>) {}
}
