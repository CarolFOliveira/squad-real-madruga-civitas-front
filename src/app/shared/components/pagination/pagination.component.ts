import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
})
export class PaginationComponent {
  @Input() public length = 18;
  public pageSize = 6;
  public pageIndex = 0;

  @Output() public pageChange: EventEmitter<PageEvent> =
    new EventEmitter<PageEvent>();

  public onPageChange(event: PageEvent): void {
    console.log(event);
  }
}
