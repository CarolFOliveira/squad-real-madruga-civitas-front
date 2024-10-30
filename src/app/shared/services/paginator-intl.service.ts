import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Injectable({
  providedIn: 'root',
})
export class PaginatorIntlService extends MatPaginatorIntl {
  public override itemsPerPageLabel = 'Itens por página';
  public override firstPageLabel = 'Primeira página';
  public override lastPageLabel = 'Última página';
  public override nextPageLabel = 'Próxima página';
  public override previousPageLabel = 'Página anterior';

  public override getRangeLabel = (
    page: number,
    pageSize: number,
    length: number
  ): string => {
    if (length === 0 || pageSize === 0) return '';
    const totalPages = Math.ceil(length / pageSize);

    return `Página ${page + 1} de ${totalPages}`;
  };
}
