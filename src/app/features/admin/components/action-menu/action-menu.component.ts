// Libs
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

// Components
import { Subscription } from 'rxjs';
import { ActionDialogComponent } from '../action-dialog/action-dialog.component';

@Component({
  selector: 'app-action-menu',
  templateUrl: './action-menu.component.html',
  styleUrls: ['./action-menu.component.scss'],
})
export class ActionMenuComponent implements OnDestroy {
  private _dialogSubscription!: Subscription;
  @Input() public itemId = -1;
  @Output() public editEvent = new EventEmitter<void>();
  @Output() public deleteEvent = new EventEmitter<number>();

  constructor(private _dialogRef: MatDialog) {}

  public onEdit(): void {
    console.log('onEdit', this.itemId);
    this.editEvent.emit();
  }

  public onDelete(): void {
    const dialogRef = this._dialogRef.open(ActionDialogComponent);

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        console.log('Item excluído', this.itemId);
      }
    });
  }

  public ngOnDestroy(): void {
    if (this._dialogSubscription) {
      this._dialogSubscription.unsubscribe();
    }
  }
}
