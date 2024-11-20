// Libs
import { Component, ViewChild } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';

// Components
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
  @ViewChild(StudentTableComponent) public studentTable!: StudentTableComponent;

  /**
   * Termo de busca utilizado para filtrar os dados da tabela de alunos.
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

  /**
   * Lista de turmas disponíveis para seleção.
   */
  // TODO: Buscar turmas do professor no backend
  public options = [
    { value: 1, viewValue: '3º ano A' },
    { value: 2, viewValue: '3º ano B' },
  ];

  /**
   * Lista de usuários (alunos) que será exibida na tabela.
   */
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

  /**
   * clearSearch
   *
   * Limpa o termo de busca e sincroniza o estado com o componente filho `StudentTableComponent`.
   */
  public clearSearch(): void {
    this.term = '';
    this.studentTable.clearSearch();
  }

  /**
   * applyFilter
   *
   * Usa `applyFilter` do componente `StudentTableComponent` para aplicar o filtro com base no termo de busca.
   */
  public applyFilter(): void {
    this.studentTable.applyFilter();
  }
}
