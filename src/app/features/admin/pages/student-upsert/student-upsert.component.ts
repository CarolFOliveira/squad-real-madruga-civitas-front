// Libs
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

// Services
import { ToastService } from 'src/app/shared/services/toast.service';
import { EntityService } from '../../services/entity.service';

// Interfaces
import { ISelectOptions } from 'src/app/shared/interfaces/ISelectOptions';
import { IClassroom } from '../../interfaces/IClassroom';
import { IEntityResponse } from '../../interfaces/IEntityResponse';
import { IStudent } from '../../interfaces/IStudent';
import { IStudentFormValue } from '../../interfaces/IStudentFormValue';

// Enum
import { ApiEndpoints } from '../../interfaces/ApiEndpoints';

// DTO
import { StudentDTO } from '../../models/Student.dto';

/**
 * StudentUpsertComponent
 *
 * Componente que representa a página de cadastro e edição dos estudantes.
 */
@Component({
  selector: 'app-student-upsert',
  templateUrl: './student-upsert.component.html',
  styleUrls: ['./student-upsert.component.scss'],
})
export class StudentUpsertComponent implements OnInit {
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _entityService: EntityService,
    private _router: Router,
    private _toastService: ToastService
  ) {}

  /**
   * Indica se o componente está no modo de edição ou de cadastro.
   */
  isEditMode = false;

  /**
   * Id do aluno, se estiver em modo de edição, caso contrário será nulo.
   */
  studentId: number | null = null;

  /**
   * Opções que serão mostradas no select das turmas.
   */
  public classrooms: ISelectOptions[] = [];

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
   * Lida com o evento de submissão do formulário de registro ou de edição de um novo aluno.
   *
   * @param $event - Evento do tipo `SubmitEvent` de envio de um formulário no browser
   * @returns Uma `Promise` vazia que é resolvida após o processo de cadastro ou edição ser concluído.
   * @remarks
   * Responsável por todo o processo de cadastrado ou edição, incluindo:
   * - Validação do formulário
   * - Transformar os dados do formulário para ficar igual ao backend usando `StudentDTO`
   * - Envio dos dados do aluno e tratamento de respostas de sucesso ou erro.
   */
  public async onSubmit($event: SubmitEvent): Promise<void> {
    $event.preventDefault();

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.form.markAsPending();

    const entity = StudentDTO.fromForm(this.form.value as IStudentFormValue);
    try {
      let response;
      if (this.isEditMode && this.studentId)
        response = await this._entityService.update<IStudent>({
          id: this.studentId,
          endpoint: ApiEndpoints.STUDENTS,
          entity,
        });
      else
        response = await this._entityService.register({
          endpoint: ApiEndpoints.STUDENTS,
          entity,
        });

      this._handleSuccess(response);
    } catch (error) {
      this._handleError(error as HttpErrorResponse);
    } finally {
      this.form.updateValueAndValidity();
    }
  }

  /**
   * _handleSuccess
   *
   * Trata o caso de sucesso do registro ou edição de um aluno.
   *
   * @param response - Objeto contendo a mensagem de sucesso do tipo {@link IEntityResponse}.
   * @remarks
   * - Mostra uma mensagem de sucesso para o usuário admin que fecha automaticamente após 3 segundos
   * - Redireciona o usuário admin para sua página principal
   */
  private _handleSuccess(response: IEntityResponse): void {
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
   * - Para outros status de erro, mostra uma notificação com a mensagem de erro definida no backend.
   */
  private _handleError(error: HttpErrorResponse): void {
    switch (error.status) {
      case 409:
        this._toastService.info(error.message);
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
   * Método responsável por buscar as turmas no serviço e alterar o formato para a lista de opções.
   *
   * @returns `Promise<void>` que é resolvida quando o processo de buscar as turmas é concluído.
   * @throws `Error` Se a resposta não for bem sucedida, um erro será lançado e um toast será exibido.
   */
  private async getClasses(): Promise<void> {
    try {
      const { data } = await this._entityService.getEntities<IClassroom>({
        endpoint: ApiEndpoints.CLASSROOMS,
      });
      if (!data.length) this._toastService.info('Nenhuma turma cadastrada.');

      this.classrooms = data.map((classroom) => ({
        value: classroom.id,
        viewValue: classroom.turmaApelido,
      }));
    } catch (error) {
      this._toastService.error(
        'Erro ao carregar as turmas. Atualize a página.'
      );
    }
  }

  /**
   * loadStudentData
   *
   * Responsável por verificar se a rota é de edição ou de cadastro.
   * Se for de edição, busca os dados do Aluno no serviço e preenche o formulário.
   *
   * @returns `Promise<void>` que é resolvida quando o processo de buscar as turmas é concluído.
   * @throws `Error` Se a resposta não for bem sucedida, um erro será lançado e um toast será exibido.
   */
  private async loadStudentData(): Promise<void> {
    const id = this._activatedRoute.snapshot.paramMap.get('id');
    if (!id) return;

    const studentId = Number(id);
    this.studentId = studentId;
    this.isEditMode = true;

    const student = await this._entityService.getEntity<IStudent>({
      endpoint: ApiEndpoints.STUDENTS,
      id: studentId,
    });
    if (!student)
      this._toastService.error(
        'Não foi possível carregar as informações. Atualize a página.'
      );

    this.form.patchValue(new StudentDTO(student).toFormValue());
  }
}
