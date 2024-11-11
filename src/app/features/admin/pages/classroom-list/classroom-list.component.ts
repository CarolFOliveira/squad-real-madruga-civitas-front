// Libs
import { Component } from '@angular/core';

// Interfaces
import { IClassroom } from '../../interfaces/IClassroom';
import { IPaginatedItems } from '../../interfaces/IPaginatedItems';

// Enum
import { ApiEndpoints } from '../../interfaces/ApiEndpoints';

/**
 * ClassroomListComponent
 *
 * Componente que representa a página que exibe uma lista de turmas.
 *
 * Este componente define o endpoint de dados e transforma cada turma para o formato esperado
 * por uma lista paginada.
 */
@Component({
  selector: 'app-classroom-list',
  templateUrl: './classroom-list.component.html',
})
export class ClassroomListComponent {
  /**
   * Endpoint para buscar dados das turmas.
   */
  public endpoint = ApiEndpoints.CLASSROOMS;

  /**
   * Mapeia um objeto `IStudent` para o formato de itens paginados.
   *
   * @param student Um objeto do tipo {@link IClassroom}.
   * @returns Uma lista paginada contento um array de objeto do tipo {@link IPaginatedItems}.
   */
  public mapClassroomsToPaginatedItems(classroom: IClassroom): IPaginatedItems {
    return {
      id: classroom.id as number,
      title: classroom.turmaApelido,
      subtitle: `Ano letivo: ${classroom.anoLetivo} - Período: ${classroom.periodoLetivo}`,
    };
  }
}
