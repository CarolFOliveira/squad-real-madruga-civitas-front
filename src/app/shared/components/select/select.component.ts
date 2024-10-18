import { Component, Input, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';

interface IOptions {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SelectComponent {
  @Input() control!: FormControl;
  @Input() label = '';
  @Input() options: IOptions[] = [];
  @Input() placeholder = '';

  getErrorMessage(): string {
    const errorMessages = {
      required: 'Este campo é obrigatório.',
    };

    for (const [key, message] of Object.entries(errorMessages))
      if (this.control?.hasError(key)) return message;

    return '';
  }
}
