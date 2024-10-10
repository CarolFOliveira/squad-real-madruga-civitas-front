import { Component, Input} from '@angular/core';

/**
 * ButtonComponent
 * Componente dinâmico de botão customizado.
 * 
 * @param texto - Texto que será exibido no botão
 * @param id - Id do botão
 * @param class - classe aplicada ao botão, que resultará na criação de um elemento <a> ou <button> e estilização diferente no css
 * @param routerLink - Rota para navegação, ao clicar no botão
 * @param type - Tipo do botão
 * 
 */


@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() texto = '';
  @Input() id = '';
  @Input() class ='';
  @Input() routerLink = '';
  @Input() type = "";

  
}
