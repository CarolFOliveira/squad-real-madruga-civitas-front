import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

  form = new FormGroup(
    {
      studentName: new FormControl('', [
        Validators.required,
        Validators.maxLength(40),
      ]),
      studentRG: new FormControl('', [
        Validators.required,
        Validators.maxLength(12),
      ]),
      enrollmentNumber: new FormControl('', [
        Validators.required,
        Validators.maxLength(6),
      ]),
      studentClass: new FormControl('', Validators.required),
      guardianCPF: new FormControl('', [
        Validators.required,
        Validators.maxLength(14),
      ]),
    },
    { updateOn: 'submit' }
  );

  onSubmit($event: SubmitEvent) {
    $event.preventDefault();

    console.log(this.form.value);
  }
}
