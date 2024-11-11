// Libs
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

// Services
import { EntityService } from '../../services/entity.service';
import { StudentService } from '../../services/student.service';

// Interfaces
import { ISelectOptions } from 'src/app/shared/interfaces/ISelectOptions';
import { ApiEndpoints } from '../../interfaces/ApiEndpoints';

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
  classrooms: ISelectOptions[] = [];

  /**
   * Indica se o componente está no modo de edição ou de cadastro.
   */
  isEditMode = false;

  /**
   * ID do professor que está sendo editado.
   * Quando estiver em modo de cadastro, este valor é `null`.
   */
  teacherId: number | null = null;

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
      classrooms: new FormControl([], Validators.required),
    },
    { updateOn: 'blur' }
  );

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _entityService: EntityService,
    private _studentService: StudentService
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
  public onSubmit($event: SubmitEvent) {
    $event.preventDefault();

    console.log(this.form.value);
  }

  // TODO: refatorar metodo e excluir _studentService
  private async getClasses(): Promise<void> {
    try {
      const studentClasses = await this._studentService.getClasses();

      if (studentClasses.length)
        this.classrooms = studentClasses.map((studentClass: any) => ({
          value: studentClass.id,
          viewValue: studentClass.turmaApelido,
        }));

      console.log({ studentClasses: this.classrooms });
    } catch (error) {
      // TODO: adicionar toast
    }
  }

  // TODO: refatorar metodo
  private async loadTeacherData(): Promise<void> {
    const id = this._activatedRoute.snapshot.paramMap.get('id');
    if (!id) return;

    const teacherId = Number(id);
    this.teacherId = teacherId;
    this.isEditMode = true;

    try {
      const teacher = (await this._entityService.getEntity({
        endpoint: ApiEndpoints.TEACHERS,
        id: teacherId,
      })) as any; // TODO: remover any

      this.form.patchValue({
        teacherName: teacher.membro.nomeCompleto,
        enrollmentNumber: teacher.membro.numeroMatricula,
        teacherCPF: teacher.membro.cpf,
        classrooms: teacher.turmas?.map((c: any) => c?.id),
      });
    } catch (error) {
      // TODO: adicionar toast
    }
  }
}
