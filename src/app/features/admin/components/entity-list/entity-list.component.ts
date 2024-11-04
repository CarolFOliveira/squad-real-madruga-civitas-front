import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-entity-list',
  templateUrl: './entity-list.component.html',
  styleUrls: ['./entity-list.component.scss'],
})
export class EntityListComponent implements OnInit {
  // TODO: remover Array de testes...
  public items: any = Array.from({ length: 50 }).map((_, i) => ({
    id: i + 1,
    title: `Item ${i + 1}`,
    subtitle: 'Subtitulo',
  }));

  public pageSize = 5;
  public pageIndex = 0;
  public paginatedItems: any = [];

  public ngOnInit(): void {
    this.updatePaginatedItems();
  }

  public onPageChange($event: PageEvent): void {
    this.pageIndex = $event.pageIndex;
    this.pageSize = $event.pageSize;
    this.updatePaginatedItems();
  }

  public updatePaginatedItems(): void {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedItems = this.items.slice(startIndex, endIndex);
  }
}
