import { Component, Input } from '@angular/core';

/**
 * BrandLinkComponent
 *
 * Componente responsável por exibir o logotipo do aplicativo na sidebar ou na toolbar.
 *
 * @remarks
 * Este componente é utilizado como um ponto de acesso rápido à home dependendo do tipo do usuário.
 * @example
 * ```html
 * <app-brand-link returnLink="/dashboard"></app-brand-link>
 * ```
 */
@Component({
  selector: 'app-brand-link',
  templateUrl: './brand-link.component.html',
  styleUrls: ['./brand-link.component.scss'],
})
export class BrandLinkComponent {
  /**
   * Especifica o link para onde o logotipo redireciona ao ser clicado.
   *
   * @defaultValue `..`
   */
  @Input() public returnLink = '..';
}
