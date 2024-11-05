// Libs
import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

// Interfaces
import { IPaginatedItems } from '../../interfaces/IPaginatedItems';
import { IStudent } from '../../interfaces/IStudent';

// Services
import { ActionMenuService } from '../../services/action-menu.service';

// Services
import { EntityService } from '../../services/entity.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
})
export class StudentListComponent implements OnInit, OnDestroy {
  private readonly endpoint = 'alunos';
  private _subscriptions: Subscription = new Subscription();
  public paginatedItems: IPaginatedItems[] = [];
  public totalItems = 0;
  public currentPage = 1;
  public isLoading = false;

  constructor(
    private _entityService: EntityService,
    private _actionMenuService: ActionMenuService,
    private _router: Router
  ) {}

  public ngOnInit(): void {
    this.getStudentsPage();
    this.subscribeToEditEvent();
    this.subscribeToDeleteEvent();
  }

  private async getStudentsPage(): Promise<void> {
    this.isLoading = true;

    try {
      const { total, data } = await this._entityService.getEntities<IStudent>({
        endpoint: this.endpoint,
        page: this.currentPage,
      });

      this.totalItems = total;
      this.paginatedItems = data.map((student) => ({
        id: student.id,
        title: student.nomeCompleto,
        subtitle: student.numeroMatricula,
      }));
    } catch (error) {
      // TODO: mostrar snackbar de erro
    } finally {
      this.isLoading = false;
    }
  }

  public onPageChange($event: PageEvent): void {
    this.currentPage = $event.pageIndex + 1;
    this.getStudentsPage();
  }

  private subscribeToEditEvent(): void {
    this._subscriptions.add(
      this._actionMenuService.editEvent$.subscribe((id: number) => {
        this._router.navigate(['administrador/editar-aluno', id]);
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

  public ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }
}
