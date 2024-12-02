// Libs
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

// Services
import { ToastService } from 'src/app/shared/services/toast.service';
import { EntityService } from '../../services/entity.service';

// Interfaces
import { ISelectOptions } from 'src/app/shared/interfaces/ISelectOptions';
import { IStudent } from '../../interfaces/IStudent';
import { IStudentFormValue } from '../../interfaces/IStudentFormValue';

// Enum
import { ApiEndpoints } from '../../interfaces/ApiEndpoints';

// Entities
import { Student } from '../../entities/Student';

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
    private _toastService: ToastService
  ) {}

  /**
   * Indica se o componente está no modo de edição ou de cadastro.
   */
  public isEditMode = false;

  /**
   * ID do aluno, disponível quando o componente estiver em modo de edição.
   * Quando estiver em modo de cadastro, este valor é `undefined`.
   */
  public studentId: number | undefined;

  /**
   * Opções que serão mostradas no select das turmas.
   */
  public classrooms: ISelectOptions[] = [];

  /**
   * Formulário de registro e edição do aluno com as devidas validações.
   */
  public form = new FormGroup(
    {
      studentName: new FormControl('', [
        Validators.required,
        Validators.maxLength(40),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
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
   * Inicializa o componente e invoca os métodos para carregar as turmas e os dados do aluno.
   */
  public ngOnInit(): void {
    this._loadClassroomData();
    this._loadStudentData();
  }

  /**
   * loadClassrooms
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
   * Lida com o evento de submissão do formulário para registrar ou editar um aluno.
   *
   * @param $event - Evento do tipo `SubmitEvent` de envio de um formulário no navegador.
   * @returns Uma `Promise` vazia, resolvida após o processamento do cadastro ou edição do aluno.
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
      endpoint: ApiEndpoints.STUDENTS,
      entity: Student.fromForm(this.form.value as IStudentFormValue),
      id: this.studentId,
      isEditMode: this.isEditMode,
    });

    this.form.updateValueAndValidity();
  }

  /**
   * _loadStudentData
   *
   * Responsável por verificar se a rota é de edição ou de cadastro.
   * Se for de edição, busca os dados do Aluno no serviço e preenche o formulário.
   *
   * @returns `Promise<void>` que é resolvida quando o processo de buscar as turmas é concluído.
   */
  private async _loadStudentData(): Promise<void> {
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
      return this._toastService.error(
        'Não foi possível carregar as informações. Atualize a página.'
      );

    this.form.patchValue(Student.toFormValue(student));
  }
}
