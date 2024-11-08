import { Component } from '@angular/core';

@Component({
  selector: 'app-class-list',
  templateUrl: './class-list.component.html',
})
export class ClassListComponent {
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
