import { Component, Input, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class InputComponent {
  /**
   * Referência ao `FormControl` associado ao input.
   *
   * @example
   * O input será vinculado ao `FormControl` `name` do formulário `form`
   * ```html
   * <app-input [control]="form.get('name')"></app-input>
   * ```
   */
  @Input() control!: FormControl;

  /**
   * Valor Opcional, `autocomplete` ajuda no preenchimento automático do campo de input.
   *
   *  **Alguns valores de exemplo:**
   * - `off`: Desativa o autocompletar
   * - `on`: Ativa o autocompletar padrão do navegador
   * - `name`: Sugere valores com base no nome, exemplo: Nome de usuário
   * - `city`: Sugere nomes de cidades
   * - `email`: Sugere endereços de email
   * - `password`: Desativa o autocompletar para campos de senha
   * @see {@link https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofilling-form-controls:-the-autocomplete-attribute}
   *
   * @defaultValue  `off` (desativado)
   * */
  @Input() autocomplete = 'off';

  /** Texto que será exibido no input.  */
  @Input() placeholder = '';

  /** Indica se os estilos de erro deve ser exibido, mesmo que o valor do input seja válido. */
  @Input() showErrors = false;

  /**
   * Define o tipo do input.
   *
   * **Alguns valores de exemplo:**
   * - `text`: Campo de texto padrão (default)
   * - `password`: Campo de senha
   * - `email`: Campo para endereços de e-mail
   * - `number`: Campo para números
   * - `date`: Campo para datas
   *
   * @see {@link https://html.spec.whatwg.org/multipage/input.html#states-of-the-type-attribute}
   *
   * @defaultValue `text`
   */
  @Input() type = 'text';

  /**
   * hasControlError
   *
   * Verifica se o input tem erro e se esse erro deve ser exibido.
   *
   * @remarks
   * A função retorna `true` e exibe o erro quando:
   * - O controle estiver inválido e o usuário já tiver interagido com o campo (touched)
   * - A propriedade `showErrors` estiver definida como `true`, indicando que o erro deve ser exibido na tela mesmo que o campo esteja válido (utilizado quando acontece falha no login, por exemplo).
   *
   * @returns retorna `true` se houver um erro no input, `false` caso contrário.
   */
  hasControlError(): boolean {
    return (this.control.invalid && this.control.touched) || this.showErrors;
  }

  /**
   * getErrorMessage
   *
   * Retorna a mensagem de erro correspondente ao primeiro erro que encontrar no input.
   *
   * @remarks
   * As mensagens são genéricas, pois este input será reutilizado em toda a aplicação.
   * Se houver um erro, esta função deve retornar a mensagem de erro correspondente para o usuário.
   * Apenas um erro é exibido por vez.
   *
   * @returns Retorna uma `string` correspondente ao primeiro erro encontrado no input.
   */
  getErrorMessage(): string {
    const errorMessages = {
      required: 'Este campo é obrigatório.',
      email: 'Por favor, digite um e-mail válido.',
      minlength: `O valor deve ter pelo menos ${
        this.control.getError('minlength')?.requiredLength
      } caracteres.`,
      maxlength: `O valor deve ter no máximo ${
        this.control.getError('maxlength')?.requiredLength
      } caracteres.`,
      // ....
    };

    for (const [key, message] of Object.entries(errorMessages))
      if (this.control.hasError(key)) return message;

    return '';
  }
}
