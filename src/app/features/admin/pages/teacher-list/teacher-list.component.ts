import { Component } from '@angular/core';

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
})
export class TeacherListComponent {
  /**
   * Endpoint para buscar dados dos professores.
   */
  public endpoint = 'professores';

  public mapTeacherToPaginatedItems(): any {
    return {
      id: 1,
      title: 'Professore Nome',
      subtitle: `Número de matrícula: 123123`,
    };
  }
}
