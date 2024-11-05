// Libs
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

// Services
import { PaginationService } from 'src/app/shared/services/pagination.service';
import { ActionMenuService } from '../../services/action-menu.service';
import { EntityService } from '../../services/entity.service';

// Interfaces
import { IPaginatedItems } from '../../interfaces/IPaginatedItems';

@Component({
  selector: 'app-entity-list',
  templateUrl: './entity-list.component.html',
  styleUrls: ['./entity-list.component.scss'],
})
export class EntityListComponent<T> implements OnInit, OnDestroy {
  private _subscriptions: Subscription = new Subscription();
  @Input() public endpoint = '';
  @Input() public sectionTitle = '';
  @Input() public mapItem!: (item: T) => IPaginatedItems;

  public paginatedItems: IPaginatedItems[] = [];
  public totalItems = 0;
  public currentPage = 1;
  public isLoading = false;

  constructor(
    private _entityService: EntityService,
    private _actionMenuService: ActionMenuService,
    private _router: Router,
    private _paginationService: PaginationService
  ) {}

  public ngOnInit(): void {
    this.subscribeToEditEvent();
    this.subscribeToDeleteEvent();
    this.subscribeToPagination();
    this.getEntityPage();
  }

  private async getEntityPage(): Promise<void> {
    this.isLoading = true;

    try {
      const { total, data } = await this._entityService.getEntities<T>({
        endpoint: this.endpoint,
        page: this.currentPage,
      });

      this.totalItems = total;
      this.paginatedItems = data.map(this.mapItem);
    } catch (error) {
      // TODO: mostrar snackbar de erro
    } finally {
      this.isLoading = false;
    }
  }

  private subscribeToEditEvent(): void {
    this._subscriptions.add(
      this._actionMenuService.editEvent$.subscribe((id: number) => {
        this._router.navigate([`administrador/editar/${this.endpoint}`, id]);
      })
    );
  }

  private subscribeToDeleteEvent(): void {
    this._subscriptions.add(
      this._actionMenuService.deleteEvent$.subscribe(async (id: number) => {
        try {
          await this._entityService.deleteEntity(id, this.endpoint);
          // TODO: mostrar snackbar de sucesso
        } catch (error) {
          console.error('Erro:', error);
          // TODO: mostrar snackbar de erro
        }
      })
    );
  }

  private subscribeToPagination(): void {
    this.currentPage = this._paginationService.getCurrentPage();

    this._subscriptions.add(
      this._paginationService.currentPage$.subscribe((page) => {
        this.currentPage = page;
        this.getEntityPage();
      })
    );
  }

  public ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }
}
