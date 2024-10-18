import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

interface IOptions {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent {
  @Input() control!: FormControl;
  @Input() label = '';
  @Input() options: IOptions[] = [];
  @Input() placeholder = '';
}
