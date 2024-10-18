import { Component } from '@angular/core';

@Component({
  selector: 'app-student-registration',
  templateUrl: './student-registration.component.html',
  styleUrls: ['./student-registration.component.scss'],
})
export class StudentRegistrationComponent {
  // TODO: remover valores de exemplo
  options = [
    { value: '6A', viewValue: '6ª ano A' },
    { value: '6B', viewValue: '6ª ano B' },
    { value: '6C', viewValue: '6ª ano C' },
  ];
}
