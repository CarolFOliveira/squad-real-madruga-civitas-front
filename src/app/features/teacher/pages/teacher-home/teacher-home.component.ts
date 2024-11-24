// Libs
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';

// Components
import { VideoDialogComponent } from 'src/app/shared/components/video-dialog/video-dialog.component';
import { StudentTableComponent } from '../../components/student-table/student-table.component';

// Services
import { TeacherService } from '../../services/teacher.service';

// Interfaces
import { ISelectOptions } from 'src/app/shared/interfaces/ISelectOptions';
import { IStudentTableData } from '../../interfaces/IStudentTableData';

/**
 * TeacherHomeComponent
 *
 * Componente que representa a página inicial do professor.
 */
@Component({
  selector: 'app-teacher-home',
  templateUrl: './teacher-home.component.html',
  styleUrls: ['./teacher-home.component.scss'],
})
export class TeacherHomeComponent implements OnInit {
  @ViewChild(StudentTableComponent) public studentTable!: StudentTableComponent;

  /**
   * Termo de busca utilizado para filtrar os dados da tabela de alunos.
   */
  public term = '';

  /**
   * Id da turma `number` que foi selecionada pelo usuário na interface.
   *
   * @defaultValue `null`
   */
  public selectedClassId: number | null = null;

  /**
   * Lista de turmas disponíveis para seleção.
   */
  public options: ISelectOptions[] = [];

  /**
   * Lista de usuários (alunos) que será exibida na tabela, objeto do tipo {@link IStudentTableData}
   */
  public students: IStudentTableData[] = [];

  constructor(
    private _dialog: MatDialog,
    private _teacherService: TeacherService
  ) {}

  /**
   * ngOnInit
   *
   * Inicializa o componente buscando os valores das turmas no backend.
   */
  public ngOnInit(): void {
    this._loadClassroomData();
  }

  /**
   * openDialog
   *
   * Responsável por abrir o modal do componente `VideoDialogComponent`.
   */
  public openDialog(): void {
    this._dialog.open(VideoDialogComponent);
  }

  /**
   * onSelect
   *
   * Captura a opção escolhida pelo usuário na interface e altera o valor de `selectedClassId`.
   *
   * @param $event Evento de mudança gerado pelo `MatSelectChange`, contendo o valor selecionado.
   */
  public onSelect($event: MatSelectChange): void {
    this.selectedClassId = $event.value;
    this._loadStudentsFromClassroom();
  }

  /**
   * clearSearch
   *
   * Limpa o termo de busca e sincroniza o estado com o componente filho `StudentTableComponent`.
   */
  public clearSearch(): void {
    this.term = '';
    this.studentTable?.clearSearch();
  }

  /**
   * applyFilter
   *
   * Usa `applyFilter` do componente `StudentTableComponent` para aplicar o filtro com base no termo de busca.
   */
  public applyFilter(): void {
    this.studentTable?.applyFilter();
  }

  /**
   * _loadClassroomData
   *
   * Inicializa as turmas no formulário no formato de array com objetos do tipo {@link ISelectOptions}.
   *
   * @returns Uma `Promise` vazia que é resolvida após carregar as turmas.
   */
  private async _loadClassroomData(): Promise<void> {
    this.options = await this._teacherService.getTeacherClassrooms();
  }

  /**
   * _loadStudentsFromClassroom
   *
   * Inicializa os alunos de uma determinada turma para ser renderizada na tabela.
   *
   * @returns Uma `Promise` vazia que é resolvida após carregar os alunos.
   */
  private async _loadStudentsFromClassroom(): Promise<void> {
    this.students = await this._teacherService.getStudentsFromClassroom();
  }
}
