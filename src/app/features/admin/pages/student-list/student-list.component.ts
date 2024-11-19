// Libs
import { Component } from '@angular/core';

// Interfaces
import { IPaginatedItems } from '../../interfaces/IPaginatedItems';
import { IStudent } from '../../interfaces/IStudent';

// Enum
import { ApiEndpoints } from '../../interfaces/ApiEndpoints';

/**
 * StudentListComponent
 *
 * Componente que representa a página que exibe uma lista de alunos.
 *
 * Este componente define o endpoint de dados e transforma cada estudante para o formato esperado
 * por uma lista paginada.
 */
@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
})
export class StudentListComponent {
  /**
   * Endpoint para buscar dados dos alunos.
   */
  public endpoint = ApiEndpoints.STUDENTS;

  /**
   * mapStudentToPaginatedItems
   *
   * Mapeia um objeto `IStudent` para o formato de itens paginados.
   *
   * @param student Um objeto do tipo {@link IStudent} combinado com um `id` do tipo `number`.
   * @returns Uma lista paginada contento um array de objeto do tipo {@link IPaginatedItems}.
   */
  public mapStudentToPaginatedItems(
    student: IStudent & { id: number }
  ): IPaginatedItems {
    return {
      id: student.id,
      title: student.nomeCompleto,
      subtitle: `Número de matrícula: ${student.numeroMatricula}`,
    };
  }
}
