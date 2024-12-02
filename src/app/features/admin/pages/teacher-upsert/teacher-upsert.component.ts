// Libs
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

// Services
import { ToastService } from 'src/app/shared/services/toast.service';
import { EntityService } from '../../services/entity.service';

// Interfaces
import { ISelectOptions } from 'src/app/shared/interfaces/ISelectOptions';
import { ITeacher } from '../../interfaces/ITeacher';
import { ITeacherFormValue } from '../../interfaces/ITeacherFormValue';

// Enum
import { ApiEndpoints } from '../../interfaces/ApiEndpoints';

// Entities
import { Teacher } from '../../entities/Teacher';

/**
 * TeacherUpsertComponent
 *
 * Componente que representa a página de cadastro e edição dos professores.
 */
@Component({
  selector: 'app-teacher-upsert',
  templateUrl: './teacher-upsert.component.html',
  styleUrls: ['./teacher-upsert.component.scss'],
})
export class TeacherUpsertComponent implements OnInit {
  /**
   * Lista de turmas disponíveis para seleção.
   */
  public classrooms: ISelectOptions[] = [];

  /**
   * Indica se o componente está no modo de edição ou de cadastro.
   */
  public isEditMode = false;

  /**
   * ID do professor que está sendo editado.
   * Quando estiver em modo de cadastro, este valor é `undefined`.
   */
  public teacherId: number | undefined;

  /**
   * Formulário utilizado para validar, cadastrar e editar as informações do professor.
   */
  public form = new FormGroup(
    {
      teacherName: new FormControl('', [
        Validators.required,
        Validators.maxLength(40),
      ]),
      teacherCPF: new FormControl('', [
        Validators.required,
        Validators.maxLength(14),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      enrollmentNumber: new FormControl('', [
        Validators.required,
        Validators.min(1),
        Validators.maxLength(6),
      ]),
      classrooms: new FormControl<number[]>([], Validators.required),
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
   * Inicializa o componente carregando as turmas e os dados do professor, se estiver em modo de edição.
   */
  public ngOnInit(): void {
    this._loadClassroomData();
    this._loadTeacherData();
  }

  /**
   * _loadClassroomData
   *
   * Inicializa as turmas no formulário no formato de array com objetos do tipo {@link ISelectOptions}.
   *
   * @returns Uma `Promise` vazia que é resolvida após carregar as turmas.
   */
  private async _loadClassroomData(): Promise<void> {
    this.classrooms = await this._entityService.getClasses();
  }

  /**
   * onSubmit
   *
   * Lida com o evento de submissão do formulário para registrar ou editar um professor.
   *
   * @param $event - Evento do tipo `SubmitEvent` de envio de um formulário no navegador.
   * @returns Uma `Promise` vazia, resolvida após o processamento do cadastro ou edição do professor.
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
      endpoint: ApiEndpoints.TEACHERS,
      entity: Teacher.fromForm(this.form.value as ITeacherFormValue),
      id: this.teacherId,
      isEditMode: this.isEditMode,
    });

    this.form.updateValueAndValidity();
  }

  /**
   * _loadTeacherData
   *
   * Responsável por verificar se a rota é de edição ou de cadastro.
   * Se for de edição, busca os dados do Professor no serviço e preenche o formulário.
   *
   * @returns `Promise<void>` que é resolvida quando o processo de buscar as turmas é concluído.
   */
  private async _loadTeacherData(): Promise<void> {
    const id = this._activatedRoute.snapshot.paramMap.get('id');
    if (!id) return;

    const teacherId = Number(id);
    this.teacherId = teacherId;
    this.isEditMode = true;

    const teacher = await this._entityService.getEntity<ITeacher>({
      endpoint: ApiEndpoints.TEACHERS,
      id: teacherId,
    });

    if (!teacher)
      return this._toastService.error(
        'Não foi possível carregar as informações. Atualize a página.'
      );

    this.form.patchValue(Teacher.toFormValue(teacher));
  }
}
