import { Component } from '@angular/core';

/**
 * ToolbarComponent
 *
 *
 * Componente responsável por renderizar uma barra de navegação (navbar).
 *
 * @remarks
 * Exibe um logotipo à esquerda e permite que o usuário defina o conteúdo à direita, como links de navegação ou botões.
 * @example
 * ```html
 * <app-toolbar>
 *    <!-- ...Conteúdo personalizável -->
 * </app-toolbar>
 * ```
 */
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {}
