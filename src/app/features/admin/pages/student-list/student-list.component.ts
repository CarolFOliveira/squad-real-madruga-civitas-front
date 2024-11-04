// Libs
import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';

// Interfaces
import { IPaginatedItems } from '../../interfaces/IPaginatedItems';

// Services
import { ActionMenuService } from '../../services/action-menu.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss'],
})
export class StudentListComponent implements OnInit, OnDestroy {
  private _subscriptions: Subscription = new Subscription();

  constructor(private _actionMenuService: ActionMenuService) {}

  // TODO: remover Array de testes...
  public items: IPaginatedItems[] = Array.from({ length: 50 }).map((_, i) => ({
    id: i + 1,
    name: `Item ${i + 1}`,
    registrationNumber: i + 1,
  }));

  public pageSize = 5;
  public pageIndex = 0;
  public totalItems = this.items.length;
  public paginatedItems: IPaginatedItems[] = [];

  public onPageChange($event: PageEvent): void {
    this.pageIndex = $event.pageIndex;
    this.pageSize = $event.pageSize;
    this.updatePaginatedItems();
  }

  public ngOnInit(): void {
    this.updatePaginatedItems();

    this._subscriptions.add(
      this._actionMenuService.editEvent$.subscribe((id) =>
        console.log({ id }, 'alunos')
      )
    );

    this._subscriptions.add(
      this._actionMenuService.deleteEvent$.subscribe((id) =>
        console.log({ id }, 'alunos')
      )
    );
  }

  public ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  // TODO: excluir essa implementação quando fizer a integração com o back
  public updatePaginatedItems(): void {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedItems = this.items.slice(startIndex, endIndex);
  }
}
