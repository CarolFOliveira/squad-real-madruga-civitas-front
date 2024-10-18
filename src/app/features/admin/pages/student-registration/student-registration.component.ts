// Libs
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

// Services
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { StudentService } from '../../services/student.service';

// Interfaces
import { IStudentData } from '../interfaces/IStudentData';

@Component({
  selector: 'app-student-registration',
  templateUrl: './student-registration.component.html',
  styleUrls: ['./student-registration.component.scss'],
})
export class StudentRegistrationComponent {
  constructor(
    private studentService: StudentService,
    private snackbarService: SnackbarService
  ) {}

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
      enrollmentNumber: new FormControl(null, [
        Validators.required,
        Validators.min(1),
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

  public async onSubmit($event: SubmitEvent): Promise<void> {
    $event.preventDefault();
    if (this.form.invalid) return;

    this.form.markAsPending();

    const student = {
      ...this.form.value,
      enrollmentNumber: Number(this.form.value.enrollmentNumber),
    } as IStudentData;

    try {
      const response = await this.studentService.register(student);
      this.handleRegisterSuccess(response);
    } catch (error) {
      this.handleRegisterError(error as HttpErrorResponse);
    }
  }

  // TODO: remover any da resposta
  private handleRegisterSuccess(response: any) {
    this.form.updateValueAndValidity();

    if (response.status === 201) {
      this.snackbarService.openSnackBar(response.message);
    }
  }

  private handleRegisterError(error: HttpErrorResponse) {
    this.form.setErrors({});

    switch (error.status) {
      case 409:
        this.snackbarService.openSnackBar(
          `Estudante já existe nos cadastros. \nVerifique as informações digitadas ou digite novas informações.`,
          'Entendi'
        );
        break;

      case 0:
        this.snackbarService.openSnackBar(
          'Não foi possível conectar ao servidor. \nVerifique sua conexão com a internet.',
          'Fechar'
        );
        break;

      default:
        this.snackbarService.openSnackBar(
          'Ocorreu um erro no servidor. Tente novamente mais tarde.',
          'Fechar'
        );
    }
  }
}
