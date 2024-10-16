import { Component, Input} from '@angular/core';
/**
 * ButtonComponent
 * Componente dinâmico de botão customizado.
 * @example
 * `<app-button></app-button>`
 */
@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  /** Texto que será exibido no botão */
  @Input() texto = '';
  /** Define o identificador do botão */
  @Input() id = '';
  /** Classe aplicada ao botão, que resultará na criação de um elemento <a> ou <button> e estilização diferente no css */
  @Input() class ='';
  /** Rota para navegação, ao clicar no botão */
  @Input() routerLink = '';
  /** Tipo do botão */
  @Input() type = "";  
}
