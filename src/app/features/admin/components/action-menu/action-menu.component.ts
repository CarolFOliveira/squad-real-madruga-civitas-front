import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-action-menu',
  templateUrl: './action-menu.component.html',
  styleUrls: ['./action-menu.component.scss'],
})
export class ActionMenuComponent {
  @Input() public itemId = -1;
  @Output() public editEvent = new EventEmitter<void>();
  @Output() public deleteEvent = new EventEmitter<number>();

  public onEdit(): void {
    console.log('onEdit', this.itemId);
  }

  public onDelete(): void {
    console.log('Delete');
  }
}
