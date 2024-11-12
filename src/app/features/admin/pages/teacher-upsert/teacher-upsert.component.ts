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
   * Quando estiver em modo de cadastro, este valor é `null`.
   */
  public teacherId: number | null = null;

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
    private _router: Router,
    private _toastService: ToastService
  ) {}

  /**
   * ngOnInit
   *
   * Inicializa o componente carregando as turmas e os dados do professor, se estiver em modo de edição.
   */
  public ngOnInit(): void {
    this.getClasses();
    this.loadTeacherData();
  }

  /**
   * onSubmit
   */
  public async onSubmit($event: SubmitEvent) {
    $event.preventDefault();

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.form.markAsPending();

    const entity = Teacher.fromForm(this.form.value as ITeacherFormValue);
    try {
      let response: IEntityResponse;
      if (this.isEditMode && this.teacherId)
        response = await this._entityService.update<ITeacher>({
          id: this.teacherId,
          endpoint: ApiEndpoints.TEACHERS,
          entity,
        });
      else
        response = await this._entityService.register<ITeacher>({
          endpoint: ApiEndpoints.TEACHERS,
          entity,
        });

      this._handleSuccess(response);
    } catch (error) {
      this._handleError(error as HttpErrorResponse);
    } finally {
      this.form.updateValueAndValidity();
    }
  }

  // TODO: refatorar
  private _handleSuccess(response: IEntityResponse): void {
    this._toastService.success(response.message);
    this._router.navigate(['administrador']);
  }
  // TODO: refatorar
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
   * Método responsável por buscar as turmas do serviço e alterar o formato para a lista de opções.
   *
   * @returns `Promise<void>` que é resolvida quando o processo de buscar as turmas é concluído.
   * @throws `Error` Se a resposta não for bem sucedida um toast será exibido.
   */
  private async getClasses(): Promise<void> {
    try {
      const { data } = await this._entityService.getEntities<IClassroom>({
        endpoint: ApiEndpoints.CLASSROOMS,
      });
      if (!data.length) this._toastService.info('Nenhuma turma cadastrada.');

      this.classrooms = data.map((classroom) => ({
        value: classroom.id as number,
        viewValue: classroom.turmaApelido,
      }));
    } catch (error) {
      this._toastService.error(
        'Erro ao carregar as turmas. Atualize a página.'
      );
    }
  }

  /**
   * loadTeacherData
   *
   * Responsável por verificar se a rota é de edição ou de cadastro.
   * Se for de edição, busca os dados do Professor no serviço e preenche o formulário.
   *
   * @returns `Promise<void>` que é resolvida quando o processo de buscar as turmas é concluído.
   */
  private async loadTeacherData(): Promise<void> {
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
