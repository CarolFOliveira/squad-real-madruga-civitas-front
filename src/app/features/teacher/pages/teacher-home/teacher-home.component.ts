import { Component, ViewChild } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { StudentTableComponent } from '../../components/student-table/student-table.component';

/**
 * Interface com os dados dos cards exibidos na interface.
 */
interface ICardData {
  icon: string;
  description: string;
  descriptionValue: number;
}

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
  @ViewChild(StudentTableComponent) studentTable!: StudentTableComponent;

  /**
   * Termo de busca utilizado para filtrar os dados da tabela.
   */
  public term = '';

  /**
   * Array de cards que exibem informações resumidas da aplicação para o usuário.
   */
  public cards: ICardData[] = [
    {
      description: 'Número de Turmas',
      // TODO: Buscar valores do backend
      descriptionValue: 6,
      icon: 'school',
    },
    {
      description: 'Número de Alunos',
      descriptionValue: 104,
      icon: 'assignment_ind',
    },
    {
      description: 'Número de PDI',
      descriptionValue: 104,
      icon: 'assignment',
    },
  ];

  // TODO: Buscar turmas do professor no backend
  public options = [
    { value: 1, viewValue: '3º ano A' },
    { value: 2, viewValue: '3º ano B' },
    { value: 3, viewValue: '3º ano C' },
    { value: 4, viewValue: '3º ano D' },
  ];

  // TODO: Buscar alunos de uma determinada turma no backend
  public users = [
    {
      id: 1,
      name: 'Bianca Souza',
      performance: 'bom',
    },
    {
      id: 2,
      name: 'Carlos Silva',
      performance: 'normal',
    },
    {
      id: 3,
      name: 'Daniel Silva',
      performance: 'ruim',
    },
  ];

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

  public clearSearch(): void {
    this.term = '';
    this.studentTable.clearSearch();
  }

  public applyFilter(): void {
    this.studentTable.applyFilter();
  }
}
