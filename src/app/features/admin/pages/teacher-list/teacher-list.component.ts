// Libs
import { Component } from '@angular/core';

// Interfaces
import { IPaginatedItems } from '../../interfaces/IPaginatedItems';
import { ITeacher } from '../../interfaces/ITeacher';

// Enum
import { ApiEndpoints } from '../../interfaces/ApiEndpoints';

/**
 * TeacherListComponent
 *
 * Componente que representa a página que exibe uma lista de professores.
 *
 * Este componente define o endpoint de dados e transforma cada professor para o formato esperado
 * por uma lista paginada.
 */
@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
})
export class TeacherListComponent {
  /**
   * Endpoint para buscar dados dos professores.
   */
  public endpoint = ApiEndpoints.TEACHERS;

  /**
   * Mapeia um objeto do tipo {@link ITeacher} para o formato de itens paginados.
   *
   * @param teacher Um objeto do tipo {@link ITeacher}.
   * @returns Uma lista paginada contento um array de objeto do tipo {@link IPaginatedItems}.
   */
  public mapTeacherToPaginatedItems(
    teacher: ITeacher & { id: number }
  ): IPaginatedItems {
    return {
      id: teacher.id,
      title: teacher.nomeCompleto,
      subtitle: `Número de matrícula: ${teacher.numeroMatricula}`,
    };
  }
}
