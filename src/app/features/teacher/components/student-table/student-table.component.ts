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

/**
 *  Interface com os dados do Aluno que serão exibidos na tabela.
 */
interface IUserTableData {
  id: number;
  name: string;
  performance: string;
}

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.scss'],
})
export class StudentTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatSort) sort!: MatSort;
  @Input() public users!: IUserTableData[];
  @Input() public term = '';
  @Output() termChange = new EventEmitter<string>();

  /**
   * Array de dados do tipo `MatTableDataSource` que permite funcionalidades nativas como filtros e paginação.
   */
  public dataSource!: MatTableDataSource<IUserTableData>;

  /**
   * Array de `string` que representa as colunas exibidas na tabela.
   */
  public displayedColumns: string[] = ['name', 'performance', 'link'];

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.users);
  }

  /**
   * ngAfterViewInit
   *
   * Método do do Angular que é chamado após a inicialização da view para configurar o sort da tabela.
   */
  public ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

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
   * clearSearch
   *
   * Reinicia o termo de pesquisa `term` e limpa os filtros da tabela.
   */
  public clearSearch(): void {
    this.term = '';
    this.termChange.emit(this.term);
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
