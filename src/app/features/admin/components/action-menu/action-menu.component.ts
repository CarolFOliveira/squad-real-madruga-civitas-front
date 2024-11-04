// Libs
import { Component, Input, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

// Components
import { ActionDialogComponent } from '../action-dialog/action-dialog.component';

// Services
import { Subscription } from 'rxjs';
import { ActionMenuService } from '../../services/action-menu.service';

@Component({
  selector: 'app-action-menu',
  templateUrl: './action-menu.component.html',
  styleUrls: ['./action-menu.component.scss'],
})
export class ActionMenuComponent implements OnDestroy {
  private _dialogSubscription!: Subscription;
  @Input() public itemId = -1;

  constructor(
    private _dialogRef: MatDialog,
    private _actionMenuService: ActionMenuService
  ) {}

  public onEdit(): void {
    this._actionMenuService.emitEdit(this.itemId);
  }

  public onDelete(): void {
    const dialogRef = this._dialogRef.open(ActionDialogComponent, {
      autoFocus: false,
    });

    this._dialogSubscription = dialogRef
      .afterClosed()
      .subscribe((confirmed) => {
        if (confirmed) {
          this._actionMenuService.emitDelete(this.itemId);
        }
      });
  }

  public ngOnDestroy(): void {
    if (this._dialogSubscription) this._dialogSubscription.unsubscribe();
  }
}
