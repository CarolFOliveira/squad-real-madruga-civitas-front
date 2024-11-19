import { Component } from '@angular/core';

/**
 * BrandLinkComponent
 *
 * Componente responsável por exibir o logotipo do aplicativo na sidebar ou na toolbar.
 *
 * @remarks
 * Este componente é utilizado como um ponto de acesso rápido à home dependendo do tipo do usuário.
 * @example
 * ```html
 * <app-brand-link></app-brand-link>
 * ```
 */
@Component({
  selector: 'app-brand-link',
  templateUrl: './brand-link.component.html',
  styleUrls: ['./brand-link.component.scss'],
})
export class BrandLinkComponent {
  // TODO: receber uma props com o link que o usuário deve ser redirecionado
}
