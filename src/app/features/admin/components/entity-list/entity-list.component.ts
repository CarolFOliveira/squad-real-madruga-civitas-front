// Libs
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

// Interfaces
import { IPaginatedItems } from '../../interfaces/IPaginatedItems';

@Component({
  selector: 'app-entity-list',
  templateUrl: './entity-list.component.html',
  styleUrls: ['./entity-list.component.scss'],
})
export class EntityListComponent {
  @Input() public sectionTitle = '';
  @Input() public totalItems = 0;
  @Input() public items: IPaginatedItems[] = [];
  @Output() public pageChangeEvent = new EventEmitter<PageEvent>();

  public onPageChange($event: PageEvent): void {
    this.pageChangeEvent.emit($event);
  }
}
