// Libs
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

// Services
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { StudentService } from '../../services/student.service';

// Interfaces
import { IStudentData } from '../../interfaces/IStudentData';

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

  // TODO: remover valores de exemplo e utilizar valores do backend
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

  /**
   * onSubmit
   *
   * Lida com o evento de submissão do formulário de registro de um novo aluno.
   *
   * @param $event - Evento do tipo `SubmitEvent` de envio de um formulário no browser
   *
   * @returns Uma `Promise` vazia que é resolvida após o processo de cadastro ser concluído.
   *
   * @remarks
   * Responsável por todo o processo de cadastrado, incluindo validação do formulário,
   * envio dos dados do aluno para cadastro e tratamento de respostas de sucesso ou erro.
   */
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

  /**
   * handleRegisterSuccess
   *
   * Trata o caso de sucesso do registro de um novo aluno.
   *
   * @param response - A resposta do servidor contendo o status 201.
   *
   * @remarks
   * - Remove o status pendente do form
   * - Mostra uma mensagem de sucesso para o usuário admin que fecha automaticamente após 1 segundo
   * - Redireciona o usuário admin para sua página principal
   */
  private handleRegisterSuccess(response: any): void {
    // TODO: remover any da resposta e fazer o redirecionamento
    this.form.updateValueAndValidity();
    this.snackbarService.openSnackBar(response.message);
  }

  /**
   * handleRegisterError
   *
   * Trata erros ocorridos durante o processo de registro de um aluno.
   *
   * @param error - Objeto de resposta do erro HTTP do tipo `HttpErrorResponse`
   *
   * @remarks
   * Redefine os erros do formulário para tirar o status pending do form.
   * - Se o status do erro for `409` (Conflito) - mostra uma notificação que o aluno já existe.
   * - Se o status do erro for `0` (Sem conexão) - mostra uma notificação que o usuário está sem internet.
   * - Para outros status de erro, mostra uma notificação com erro genérico de "Ocorreu um erro no servidor".
   */
  private handleRegisterError(error: HttpErrorResponse): void {
    this.form.setErrors({});

    switch (error.status) {
      case 409:
        this.snackbarService.openSnackBar(
          `Estudante já existe nos cadastros. \nVerifique as informações digitadas ou digite novas informações.`,
          'Entendi'
        );
        break;

      case 0 && error.error instanceof ProgressEvent:
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
