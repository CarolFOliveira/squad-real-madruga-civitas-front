import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  /**
   * Emite um evento chamado `menuClick` quando o botão de menu é clicado.
   */
  @Output() menuClick = new EventEmitter<void>();
}
