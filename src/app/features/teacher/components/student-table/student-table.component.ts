// Libs
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

// Interfaces
import { IStudentTableData } from '../../interfaces/IStudentTableData';

/**
 * StudentTableComponent
 *
 * Componente que exibe uma tabela de alunos com funcionalidades de filtro e ordenação.
 *
 * @example
 * ```html
 * <app-student-table
 *   [users]="users"
 *   [term]="term"
 *   (termChangeEvent)="term = $event"
 * />
 * ```
 */
@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.scss'],
})
export class StudentTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatSort) public sort!: MatSort;

  /**
   * Array de alunos exibidos na tabela, cada objeto será do tipo {@link IUserTableData}
   */
  @Input() public students!: IStudentTableData[];

  /**
   * Termo de busca do tipo `string` utilizado para filtrar os dados da tabela.
   */
  @Input() public term = '';

  /**
   * Evento emitido quando o termo de busca é alterado.
   */
  @Output() public termChangeEvent = new EventEmitter<string>();

  /**
   * Array de dados do tipo `MatTableDataSource` que permite funcionalidades nativas como filtros.
   */
  public dataSource!: MatTableDataSource<IStudentTableData>;

  /**
   * Array de `string` que representa as colunas exibidas na tabela.
   */
  public displayedColumns: string[] = ['name', 'performance', 'link'];

  /**
   * ngOnInit
   *
   * Inicializa o `MatTableDataSource` com os dados recebidos.
   */
  public ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.students);
  }

  /**
   * ngAfterViewInit
   *
   * Configura o mecanismo de ordenação da tabela após a inicialização da view.
   */
  public ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  /**
   * getPerformanceClass
   *
   * Retorna a classe CSS correspondente ao desempenho fornecido.
   *
   * @param value `string` que corresponde ao valor de desempenho vindo do backend.
   * @returns `string` que representa a tradução do desempenho em inglês.
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
   * clearSearch
   *
   * Limpa o termo de busca, notifica o componente pai e aplica o filtro na tabela.
   */
  public clearSearch(): void {
    this.term = '';
    this.termChangeEvent.emit(this.term);
    this.applyFilter();
  }

  /**
   * applyFilter
   *
   * Aplica o filtro na tabela utilizando o termo de pesquisa `term`.
   */
  public applyFilter() {
    this.dataSource.filter = this.term.trim().toLowerCase();
  }
}
