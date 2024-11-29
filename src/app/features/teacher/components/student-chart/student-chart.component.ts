import { Component, Input } from '@angular/core';
import { ApexAxisChartSeries } from 'ng-apexcharts';
import { customChartOptions } from '../../config/chart-options';

/**
 * StudentChartComponent
 *
 * Componente que exibe o gráfico de evolução dos PDIs de um aluno.
 */
@Component({
  selector: 'app-student-chart',
  templateUrl: './student-chart.component.html',
  styleUrls: ['./student-chart.component.scss'],
})
export class StudentChartComponent {
  /**
   * Indica o estado de carregamento dos dados.
   *
   * @defaultValue `false`
   */
  @Input() public isLoading = false;

  /**
   * Objeto com os dados que serão renderizados no gráfico.
   */
  @Input() public series: ApexAxisChartSeries = [];

  /**
   * Data de registro do último PDI do aluno exibida na interface.
   */
  @Input() public registrationDate = '';

  /**
   * Personalização do gráfico ApexCharts
   */
  public chartOptions = customChartOptions;
}
