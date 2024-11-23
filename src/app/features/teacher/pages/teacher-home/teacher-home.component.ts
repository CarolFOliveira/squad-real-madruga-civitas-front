// Libs
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';

// Components
import { VideoDialogComponent } from 'src/app/shared/components/video-dialog/video-dialog.component';
import { StudentTableComponent } from '../../components/student-table/student-table.component';

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
export class TeacherHomeComponent {
  @ViewChild(StudentTableComponent) public studentTable!: StudentTableComponent;

  /**
   * Termo de busca utilizado para filtrar os dados da tabela de alunos.
   */
  public term = '';

  /**
   * Lista de turmas disponíveis para seleção.
   */
  // TODO: Buscar turmas do professor no backend
  public options: ISelectOptions[] = [
    { value: 1, viewValue: '3º ano A' },
    { value: 2, viewValue: '3º ano B' },
  ];

  /**
   * Lista de usuários (alunos) que será exibida na tabela, objeto do tipo {@link IStudentTableData}
   */
  // TODO: Buscar alunos de uma determinada turma no backend
  public students!: IStudentTableData[];

  constructor(private _dialog: MatDialog) {}

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
   * Captura a opção escolhida pelo usuário na interface.
   *
   * @param $event Evento de mudança gerado pelo `MatSelectChange`, contendo o valor selecionado.
   */
  public onSelect($event: MatSelectChange): void {
    // TODO: chamar o backend com o valor selecionado
    console.log({ value: $event.value });
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
}
