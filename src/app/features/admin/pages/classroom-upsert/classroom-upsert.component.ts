// Libs
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

// Services
import { ToastService } from 'src/app/shared/services/toast.service';
import { EntityService } from '../../services/entity.service';

// Interfaces
import { ISelectOptions } from 'src/app/shared/interfaces/ISelectOptions';
import { IClassroom } from '../../interfaces/IClassroom';
import { IClassroomFormValue } from '../../interfaces/IClassroomFormValue';

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
  public academicYearOptions = this._enumToSelectOptions(AcademicYear);

  /**
   * Array de opções de nível de ensino convertidas para o formato de seleção {@link ISelectOptions[]}.
   */
  public educationLevelOptions = this._enumToSelectOptions(EducationLevel);

  /**
   * Array de opções de período letivo convertidas para o formato de seleção {@link ISelectOptions[]}.
   */
  public classPeriodOptions = this._enumToSelectOptions(ClassPeriod);

  /**
   * Indica se o componente está no modo de edição ou de cadastro.
   */
  public isEditMode = false;

  /**
   * ID da turma, disponível quando o componente estiver em modo de edição.
   * Quando estiver em modo de cadastro, este valor é `undefined`.
   */
  public classroomId: number | undefined;

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
    private _toastService: ToastService
  ) {}

  /**
   * ngOnInit
   *
   * Inicializa o componente e chama o método para fazer o fetch da turma, se estiver no modo edição.
   */
  public ngOnInit(): void {
    this._loadClassroomData();
  }

  /**
   * onSubmit
   *
   * Lida com o evento de submissão do formulário para registrar ou editar uma nova turma.
   *
   * @param $event - Evento do tipo `SubmitEvent` de envio de um formulário no navegador.
   * @returns Uma `Promise` vazia, resolvida após o processamento do cadastro ou edição da turma.
   * @remarks
   * Esta função:
   * - Previne a atualização automática da página no envio do formulário.
   * - Marca todos os campos como inválidos se o formulário não estiver preenchido corretamente.
   * - Se o formulário for válido, define o estado como `pending` até a conclusão com `updateValueAndValidity`.
   */
  public async onSubmit($event: SubmitEvent): Promise<void> {
    $event.preventDefault();

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.form.markAsPending();

    this._entityService.upsert({
      endpoint: ApiEndpoints.CLASSROOMS,
      entity: Classroom.fromForm(this.form.value as IClassroomFormValue),
      id: this.classroomId,
      isEditMode: this.isEditMode,
    });

    this.form.updateValueAndValidity();
  }

  /**
   * _loadClassroomData
   *
   * Responsável por verificar se a rota é de edição ou de cadastro.
   * Se for de edição, busca os dados da Turma no serviço e preenche o formulário.
   *
   * @returns `Promise<void>` que é resolvida quando o processo de buscar as turmas é concluído.
   */
  private async _loadClassroomData() {
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

  /**
   * _enumToSelectOptions
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
   * const options = this._enumToSelectOptions(EducationLevel);
   * // Resultado: [{ value: 'Pré-escola', viewValue: 'Pré-escola' }]
   * ```
   */
  private _enumToSelectOptions(
    enumObj: Record<string, string>
  ): ISelectOptions[] {
    return Object.values(enumObj).map((value) => ({ value, viewValue: value }));
  }
}
