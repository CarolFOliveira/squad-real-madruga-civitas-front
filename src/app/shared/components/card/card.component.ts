import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() buttonLabel = '';
  @Input() imageDescription =
    "A imagem tem quatro círculos, cada um representando um aspecto diferente da escola: Círculo superior esquerdo: Um caderno com 'ABC', lápis e papel, representando a aprendizagem do alfabeto e escrita básica. Círculo superior direito: Um arco-íris, régua, dado, círculo e triângulo, sugerindo o aprendizado de formas, cores e conceitos matemáticos básicos. Círculo inferior esquerdo: Um quadro-negro com figuras geométricas, letras e símbolos, além de uma bola de basquete e tesoura, indicando aprendizado mais avançado, como geometria. Círculo inferior direito: Mochila, tubo de ensaio, giz de cera e tesoura, representando materiais escolares.";
  @Input() imageUrl = '/assets/card-default-image.png';
  @Input() routerLink = '';
}
