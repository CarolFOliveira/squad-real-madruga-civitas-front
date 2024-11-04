import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

/**
 * PaginationComponent
 *
 * Componente que gerencia a paginação de uma lista de items.
 *
 * @remarks
 * Recebe informações sobre o tamanho total de páginas, o tamanho de cada página e
 * o índice atual da página, e emite eventos de mudança de página.
 *
 * @example
 * ```html
 * <app-pagination
 *   [length]="totalItems"
 *   [pageSize]="itemsPerPage"
 *   [pageIndex]="currentPage"
 *   (pageChange)="onPageChange($event)"
 * ></app-pagination>
 * ```
 */
@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
  /**
   * Tamanho total dos itens a ser exibido.
   *
   * @defaultValue `0`
   *
   * @remarks
   * Caso o valor permaneça `0`, uma mensagem informando a ausência de itens será exibida.
   */
  @Input() public length = 0;

  /**
   * Quantidade de itens exibido por página.
   *
   * * @defaultValue `5`
   */
  @Input() public pageSize = 5;

  /**
   * Índice da página atual (baseado em zero).
   *
   * @defaultValue `0`
   */
  @Input() public pageIndex = 0;

  /**
   * Evento emitido toda vez que há uma mudança de página.
   *
   * Emite um `PageEvent` contendo informações sobre a página atual, tamanho da página e outros dados.
   */
  @Output() public pageChange: EventEmitter<PageEvent> =
    new EventEmitter<PageEvent>();

  /**
   * onPageChange
   *
   * Responsável por emitir o evento `pageChange` com as informações do evento de paginação.
   *
   * @param event - O evento de paginação contendo o novo índice da página e o tamanho da página.
   */
  public onPageChange(event: PageEvent): void {
    this.pageChange.emit(event);
  }
}
