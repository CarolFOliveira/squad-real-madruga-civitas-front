// Libs
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

// Services
import { ToastService } from 'src/app/shared/services/toast.service';
import { StudentService } from '../../services/student.service';

// Interfaces
import { ISelectOptions } from 'src/app/shared/interfaces/ISelectOptions';
import { IStudentCreateRequest } from '../../interfaces/IStudentCreateRequest';
import { IStudentCreateResponse } from '../../interfaces/IStudentCreateResponse';

/**
 * StudentCreateComponent
 *
 * Componente que representa a página de cadastro dos estudantes.
 *
 * Este componente gerencia a lógica e a interface para registrar novos estudantes na aplicação.
 */
@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.scss'],
})
export class StudentCreateComponent implements OnInit {
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _studentService: StudentService,
    private _toastService: ToastService
  ) {}

  isEditMode = false;
  studentId: number | null = null;

  /**
   * Opções que serão mostradas no dropdown de turmas.
   */
  public options: ISelectOptions[] = [];

  /**
   * Formulário de registro de estudante com as devidas validações.
   */
  public form = new FormGroup(
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
        Validators.min(1),
        Validators.maxLength(6),
      ]),
      studentClass: new FormControl('', Validators.required),
      guardianCPF: new FormControl('', [
        Validators.required,
        Validators.maxLength(14),
      ]),
    },
    { updateOn: 'blur' }
  );

  /**
   * ngOnInit
   *
   * Inicializa o componente e chama o método para fazer o fetch das turmas no serviço de estudantes.
   */
  public ngOnInit(): void {
    this.getClasses();
    this.loadStudentData();
  }

  /**
   * onSubmit
   *
   * Lida com o evento de submissão do formulário de registro de um novo aluno.
   *
   * @param $event - Evento do tipo `SubmitEvent` de envio de um formulário no browser
   * @returns Uma `Promise` vazia que é resolvida após o processo de cadastro ser concluído.
   * @remarks
   * Responsável por todo o processo de cadastrado, incluindo validação do formulário,
   * envio dos dados do aluno para cadastro e tratamento de respostas de sucesso ou erro.
   */
  public async onSubmit($event: SubmitEvent): Promise<void> {
    $event.preventDefault();

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.form.markAsPending();
    const student = this.form.value as IStudentCreateRequest;

    try {
      if (this.isEditMode && this.studentId) {
        const response = await this._studentService.update(
          student,
          this.studentId
        );
        this._handleUpdateSuccess(response);
      } else {
        const response = await this._studentService.register(student);
        this._handleRegisterSuccess(response);
      }
    } catch (error) {
      this._handleError(error as HttpErrorResponse);
    } finally {
      this.form.updateValueAndValidity();
    }
  }

  /**
   * _handleRegisterSuccess
   *
   * Trata o caso de sucesso do registro de um novo aluno.
   *
   * @param response - A resposta do servidor contendo o status 201.
   * @remarks
   * - Remove o status pendente do form
   * - Mostra uma mensagem de sucesso para o usuário admin que fecha automaticamente após 1 segundo
   * - Redireciona o usuário admin para sua página principal
   */
  private _handleRegisterSuccess(response: IStudentCreateResponse): void {
    this._toastService.success(response.message);
    this._router.navigate(['administrador']);
  }

  private _handleUpdateSuccess(response: any): void {
    this._toastService.success(response.message);
    this._router.navigate(['administrador']);
  }

  /**
   * _handleError
   *
   * Trata erros ocorridos durante o processo de registro de um aluno.
   *
   * @param error - Objeto de resposta do erro HTTP do tipo `HttpErrorResponse`
   * @remarks
   * Redefine os erros do formulário para tirar o status pending do form.
   * - Se o status do erro for `409` (Conflito) - mostra uma notificação que o aluno já existe.
   * - Se o status do erro for `0` (Sem conexão) - mostra uma notificação que o usuário está sem internet.
   * - Para outros status de erro, mostra uma notificação com erro genérico de "Ocorreu um erro no servidor".
   */
  private _handleError(error: HttpErrorResponse): void {
    switch (error.status) {
      case 409:
        this._toastService.info('Aluno já existe nos cadastros. ');
        break;

      case 0 && error.error instanceof ProgressEvent:
        this._toastService.error('Não foi possível conectar ao servidor.');
        break;

      default:
        this._toastService.error(error.error.message);
    }
  }

  /**
   * getClasses
   *
   * Método responsável por buscar as turmas do serviço de estudantes e alterar o formato
   * para a lista de opções exibida no select da interface.
   *
   * @returns `Promise<void>` que é resolvida quando o processo de buscar as turmas é concluído.
   * @throws `Error` Se a resposta não for bem sucedida, um erro será lançado e uma snackbar será exibida.
   */
  private async getClasses(): Promise<void> {
    try {
      const studentClasses = await this._studentService.getClasses();
      if (!studentClasses.length)
        this._toastService.info('Nenhuma turma cadastrada.');

      this.options = studentClasses.map((studentClass) => ({
        value: studentClass.id,
        viewValue: studentClass.turmaApelido,
      }));
    } catch (error) {
      this._toastService.error(
        'Erro ao carregar as turmas. Atualize a página novamente.'
      );
    }
  }

  private async loadStudentData(): Promise<void> {
    const id = this._activatedRoute.snapshot.paramMap.get('id');
    if (!id) return;
    console.log({ id });

    const studentId = Number(id);
    this.studentId = studentId;
    this.isEditMode = true;

    const student = (await this._studentService.getStudent(studentId)) as any;
    console.log({ student });

    if (student) {
      this.form.patchValue({
        studentName: student.membro.nomeCompleto,
        studentRG: student.membro.rg,
        enrollmentNumber: student.membro.numeroMatricula,
        studentClass: student.turma.id,
        guardianCPF: student.responsavel.membro.cpf,
      });
    }
  }
}
