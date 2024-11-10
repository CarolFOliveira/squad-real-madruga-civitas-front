import { Component } from '@angular/core';

@Component({
  selector: 'app-classroom-list',
  templateUrl: './classroom-list.component.html',
})
export class ClassroomListComponent {
  /**
   * Endpoint para buscar dados das turmas.
   */
  public endpoint = 'turmas';

  public mapClassesToPaginatedItems(): any {
    return {
      id: 1,
      title: 'Exemplo titulo',
      subtitle: `Exemplo Subtitulo`,
    };
  }
}
