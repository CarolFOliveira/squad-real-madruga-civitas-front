// Libs
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Subscription } from 'rxjs';

// Config
import { customChartOptions } from '../../config/chart-options';

// Interfaces
import { FormControl } from '@angular/forms';
import { ApexAxisChartSeries } from 'ng-apexcharts';
import { IStudentIdpHistory } from '../../interfaces/IStudentIdpHistory';

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
export class StudentChartComponent implements OnInit, OnChanges, OnDestroy {
  /**
   * Utilizada para cancelar a inscrição quando o componente for destruído.
   */
  private _subscription: Subscription = Subscription.EMPTY;

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
   * Lista de registros que representa o histórico de PDIs do aluno.
   */
  @Input() public studentIdpRecords: IStudentIdpHistory[] = [];

  /**
   * Evento emitido quando o id do PDI é alterado.
   */
  @Output() public selectedIdChange = new EventEmitter<number>();

  /**
   * Controle do formulário responsável por gerenciar o valor do PDI selecionado.
   */
  public optionsControl = new FormControl();

  /**
   * ID do PDI selecionado atualmente.
   */
  public selectedId: number | null = null;

  /**
   * Personalização do gráfico ApexCharts
   */
  public chartOptions = customChartOptions;

  /**
   * ngOnInit
   *
   * Inicializa o componente e se inscreve para monitorar as alterações do `optionsControl`.
   */
  public ngOnInit(): void {
    this._subscription = this.optionsControl.valueChanges.subscribe((value) => {
      this._handleSelectionChange(value);
    });
  }

  /**
   * ngOnChanges
   *
   * Monitora mudanças nos Inputs e seleciona um valor padrão caso nenhum outro tenha sido selecionado.
   *
   * @param changes - Objeto contendo as mudanças detectadas nas propriedades.
   */
  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['studentIdpRecords'] && !this.selectedId)
      this.optionsControl.setValue(this.studentIdpRecords[0]?.id);
  }

  /**
   * _handleSelectionChange
   *
   * Atualiza o valor de `selectedId` com novo valor e notifica componente pai.
   *
   * @param selectedValue `number` que representa novo valor selecionado.
   * @remarks
   * - Atualiza a propriedade `selectedId` com o novo valor.
   * - Emite o evento `selectedIdChange` com o novo ID selecionado.
   */
  private _handleSelectionChange(selectedValue: number): void {
    this.selectedId = selectedValue;
    this.selectedIdChange.emit(this.selectedId);
  }

  /**
   * ngOnDestroy
   *
   * Limpa as inscrições para evitar vazamentos de memória quando o componente for destruído.
   */
  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
