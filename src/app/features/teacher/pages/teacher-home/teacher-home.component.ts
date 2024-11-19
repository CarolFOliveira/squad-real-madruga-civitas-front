import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

/**
 * Interface com os dados do Aluno que serão exibidos na tabela.
 */
interface IUserTableData {
  id: number;
  name: string;
  performance: string;
}

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
export class TeacherHomeComponent implements AfterViewInit {
  @ViewChild(MatSort) sort!: MatSort;

  /**
   * Array de `string` que representa as colunas exibidas na tabela.
   */
  public displayedColumns: string[] = ['name', 'performance', 'link'];

  /**
   * Array de dados do tipo `MatTableDataSource` que permite funcionalidades nativas como filtros e paginação.
   */
  public dataSource: MatTableDataSource<IUserTableData>;

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
   * Termo de busca utilizado para filtrar os dados da tabela.
   */
  public term = '';

  constructor() {
    this.dataSource = new MatTableDataSource(this.users);
    this.dataSource.sort = this.sort;
  }

  /**
   * ngAfterViewInit
   *
   * Método do do Angular que é chamado após a inicialização da view para configurar o sort da tabela.
   */
  public ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  // TODO: Buscar turmas do professor no backend
  public options = [
    { value: 1, viewValue: '3º ano A' },
    { value: 2, viewValue: '3º ano B' },
    { value: 3, viewValue: '3º ano C' },
    { value: 4, viewValue: '3º ano D' },
  ];

  // TODO: Buscar alunos de uma determinada turma no backend
  public users: IUserTableData[] = [
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
   * getPerformance
   *
   * Retorna a classe CSS correspondente ao desempenho fornecido.
   *
   * @param value Uma `string` que corresponde ao valor de desempenho vindo do backend.
   * @returns Uma `string` que representa a tradução do desempenho em inglês.
   */
  public getPerformanceClass(value: string): string {
    const performance: { [key: string]: string } = {
      bom: 'good',
      normal: 'normal',
      ruim: 'bad',
    };

    return performance[value];
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
   * applyFilter
   *
   * Aplica o filtro na tabela utilizando o termo de pesquisa `term`.
   */
  public applyFilter() {
    this.dataSource.filter = this.term.trim().toLowerCase();
  }

  /**
   * clearSearch
   *
   * Reinicia o termo de pesquisa `term` e limpa os filtros da tabela.
   */
  public clearSearch(): void {
    this.term = '';
    this.applyFilter();
  }
}
