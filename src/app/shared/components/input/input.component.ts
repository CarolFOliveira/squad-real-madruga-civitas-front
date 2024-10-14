import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  @Input() control = new FormControl();
  @Input() autocomplete = '';
  @Input() placeholder = '';
  @Input() showErrors = false;
  @Input() type = 'text';

  hasControlError(): boolean {
    return (this.control.invalid && this.control.touched) || this.showErrors;
  }

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
    };

    for (const [key, message] of Object.entries(errorMessages))
      if (this.control.hasError(key)) return message;

    return '';
  }
}
