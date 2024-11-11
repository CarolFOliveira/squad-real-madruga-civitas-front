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
import { IClassroomFormValue } from '../../interfaces/IClassroomFormValue';
import { IEntityResponse } from '../../interfaces/IEntityResponse';

// Enum
import { ApiEndpoints } from '../../interfaces/ApiEndpoints';

// Entities
import { Classroom } from '../../entities/Classroom';

enum AcademicYear {
  YEAR_1 = '1º ano',
  YEAR_2 = '2º ano',
  YEAR_3 = '3º ano',
  YEAR_4 = '4º ano',
  YEAR_5 = '5º ano',
  YEAR_6 = '6º ano',
}

enum EducationLevel {
  NURSERY = 'Maternal',
  PRESCHOOL = 'Pré-escola',
  ELEMENTARY = 'Ensino fundamental 1',
}

enum ClassPeriod {
  MORNING = 'Manhã',
  AFTERNOON = 'Tarde',
  EVENING = 'Noite',
}

/**
 * ClassroomUpsertComponent
 *
 * Componente que representa a página de cadastro e edição das turmas.
 */
@Component({
  selector: 'app-classroom-upsert',
  templateUrl: './classroom-upsert.component.html',
  styleUrls: ['./classroom-upsert.component.scss'],
})
export class ClassroomUpsertComponent implements OnInit {
  /**
   * Array de opções de ano letivo convertidas para o formato de seleção {@link ISelectOptions[]}.
   */
  public academicYearOptions = this.enumToSelectOptions(AcademicYear);

  /**
   * Array de opções de nível de ensino convertidas para o formato de seleção {@link ISelectOptions[]}.
   */
  public educationLevelOptions = this.enumToSelectOptions(EducationLevel);

  /**
   * Array de opções de período letivo convertidas para o formato de seleção {@link ISelectOptions[]}.
   */
  public classPeriodOptions = this.enumToSelectOptions(ClassPeriod);

  /**
   * Indica se o componente está no modo de edição ou de cadastro.
   */
  public isEditMode = false;

  /**
   * ID da turma, disponível quando o componente estiver em modo de edição; caso contrário, será `null`
   */
  public classroomId: number | null = null;

  /**
   * Formulário de registro e edição da turma com as devidas validações.
   */
  public form = new FormGroup(
    {
      academicYear: new FormControl('', Validators.required),
      classPeriod: new FormControl('', Validators.required),
      educationLevel: new FormControl('', Validators.required),
      alias: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
    },
    { updateOn: 'blur' }
  );

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _entityService: EntityService,
    private _router: Router,
    private _toastService: ToastService
  ) {}

  /**
   * ngOnInit
   *
   * Inicializa o componente e chama o método para fazer o fetch da turma, se estiver no modo edição.
   */
  public ngOnInit(): void {
    this.loadClassroomData();
  }

  /**
   * onSubmit
   *
   * Lida com o evento de submissão do formulário de registro ou de edição de uma nova turma.
   *
   * @param $event - Evento do tipo `SubmitEvent` de envio de um formulário no browser.
   * @returns Uma `Promise` vazia que é resolvida após o processo de cadastro ou edição ser concluído.
   * @remarks
   * Responsável por todo o processo de cadastrado ou edição, incluindo:
   * - Validação do formulário;
   * - Transformar os dados do formulário para ficar igual ao backend a entidade `Classroom`;
   * - Envio dos dados da turma e tratamento de respostas de sucesso ou erro.
   */
  public async onSubmit($event: SubmitEvent): Promise<void> {
    $event.preventDefault();

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.form.markAsPending();

    const entity = Classroom.fromForm(this.form.value as IClassroomFormValue);
    try {
      let response: IEntityResponse;
      if (this.isEditMode && this.classroomId)
        response = await this._entityService.update<IClassroom>({
          id: this.classroomId,
          endpoint: ApiEndpoints.CLASSROOMS,
          entity,
        });
      else
        response = await this._entityService.register<IClassroom>({
          endpoint: ApiEndpoints.CLASSROOMS,
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
   * Trata o caso de sucesso do registro ou edição de uma turma.
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
   * Trata erros ocorridos durante o processo de registro de uma turma.
   *
   * @param error - Objeto de resposta do erro HTTP do tipo `HttpErrorResponse`
   * @remarks
   * - Se o status do erro for `409` (Conflito) - mostra uma notificação que a turma já existe.
   * - Se o status do erro for `0` (Sem conexão) - mostra uma notificação que "Não foi possível conectar ao servidor."
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
   * enumToSelectOptions
   *
   * Converte um enum em um array de objetos do tipo {@link ISelectOptions}.
   *
   * @param enumObj - O enum que será convertido. É restrito a um `Record<string, string>`
   * @returns Um array de objetos do tipo {@link ISelectOptions}
   * @example
   * ```ts
   * enum EducationLevel {
   *   PRESCHOOL = 'Pré-escola',
   * }
   * const options = this.enumToSelectOptions(EducationLevel);
   * // Resultado: [{ value: 'Pré-escola', viewValue: 'Pré-escola' }]
   * ```
   */
  private enumToSelectOptions(
    enumObj: Record<string, string>
  ): ISelectOptions[] {
    return Object.values(enumObj).map((value) => ({ value, viewValue: value }));
  }

  /**
   * loadClassroomData
   *
   * Responsável por verificar se a rota é de edição ou de cadastro.
   * Se for de edição, busca os dados da Turma no serviço e preenche o formulário.
   *
   * @returns `Promise<void>` que é resolvida quando o processo de buscar as turmas é concluído.
   */
  private async loadClassroomData() {
    const id = this._activatedRoute.snapshot.paramMap.get('id');
    if (!id) return;

    const classroomId = Number(id);
    this.classroomId = classroomId;
    this.isEditMode = true;

    const classroom = await this._entityService.getEntity<IClassroom>({
      endpoint: ApiEndpoints.CLASSROOMS,
      id: classroomId,
    });

    if (!classroom)
      return this._toastService.error(
        'Não foi possível carregar as informações. Atualize a página.'
      );

    this.form.patchValue(Classroom.toFormValue(classroom));
  }
}
