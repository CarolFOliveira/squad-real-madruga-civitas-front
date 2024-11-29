// Libs
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// Interfaces
import { ApexAxisChartSeries } from 'ng-apexcharts';
import { IStudentIdpHistory } from '../../interfaces/IStudentIdpHistory';
import { IStudentIdpSummary } from '../../interfaces/IStudentIdpSummary';

// Services
import { ToastService } from 'src/app/shared/services/toast.service';
import { TeacherService } from '../../services/teacher.service';

/**
 * StudentIdpChartComponent
 *
 * Componente que representa a página que exibe o gráfico do PDI do aluno.
 */
@Component({
  selector: 'app-student-idp-chart',
  templateUrl: './student-idp-chart.component.html',
  styleUrls: ['./student-idp-chart.component.scss'],
})
export class StudentIdpChartComponent implements OnInit {
  /**
   * ID do aluno recuperado a partir dos parâmetros da rota.
   */
  public studentId!: number;

  /**
   * O registro mais recente do PDI do aluno.
   */
  public latestStudentIdpRecord!: IStudentIdpHistory;

  /**
   * Uma lista com o histórico de PDIs do aluno, cada PDI segue o formato {@link IStudentIdpHistory}.
   */
  public studentIdpHistory: IStudentIdpHistory[] = [];

  /**
   * Define as séries de dados a serem exibidas no gráfico ApexCharts.
   */
  public series: ApexAxisChartSeries = [];

  /**
   * Dados gerais do aluno e professor presentes no PDI.
   */
  public idpData!: IStudentIdpSummary;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _teacherService: TeacherService,
    private _toastService: ToastService
  ) {}

  /**
   * ngOnInit
   *
   * Define as configurações iniciais para carregar os dados exibidos no componente.
   */
  public ngOnInit(): void {
    this._getStudentId();
    this._initialize();
  }

  /**
   * _initialize
   *
   * Carrega os dados necessários do componente incluindo:
   * - Histórico de PDIs
   * - Detalhes do último PDI para montar o gráfico
   * - Dados do aluno para exibir no card da seção.
   *
   * @remarks
   * Caso ocorra algum erro durante o carregamento, exibe  uma mensagem de erro.
   * @returns Uma Promise que é resolvida quando todos os dados são carregados.
   */
  private async _initialize(): Promise<void> {
    try {
      await this._loadStudentIdpHistory();
      await this._loadStudentIdpDetails();
      await this._loadStudentData();
    } catch (error) {
      this._toastService.error('Erro ao inicializar os dados');
    }
  }

  /**
   * _loadStudentIdpHistory
   *
   * Carrega o histórico de PDIs de um aluno específico para popular o select com histórico de registros.
   *
   * @returns Uma Promise resolvida quando o histórico de PDIs é carregado com sucesso.
   */
  private async _loadStudentIdpHistory(): Promise<void> {
    this.studentIdpHistory = await this._teacherService.getStudentIdpHistory(
      this.studentId
    );
    this.latestStudentIdpRecord = this.studentIdpHistory[0];
  }

  /**
   * _loadStudentIdpData
   *
   * Carrega os dados do PDI de um aluno específico, utilizando o ID do último PDI carregado.
   *
   * @returns Uma Promise resolvida quando o último PDI do aluno é carregado com sucesso.
   */
  private async _loadStudentIdpDetails(): Promise<void> {
    const studentIdp = await this._teacherService.getStudentIdp(
      this.latestStudentIdpRecord.id
    );
    this.series = [
      { name: 'Mês Anterior', data: [...studentIdp.previousIdpAverages] },
      { name: 'Mês Atual', data: [...studentIdp.averages] },
    ];
  }

  /**
   * _loadStudentData
   *
   * Carrega os dados do aluno.
   *
   * @remarks
   * Responsável por buscar os dados do aluno utilizando o serviço do professor e atribuí-los à `idpData`.
   */
  private async _loadStudentData(): Promise<void> {
    this.idpData = await this._teacherService.getStudentData(this.studentId);
  }

  /**
   * _getStudentId
   *
   * Obtém o ID do aluno da rota ativa.
   *
   * @remarks
   * Extrai o parâmetro `id` do snapshot da rota ativa, converte para número e atribui à `studentId`.
   */
  private _getStudentId(): void {
    const id = this._activatedRoute.snapshot.paramMap.get('id');
    this.studentId = Number(id);
  }
}
