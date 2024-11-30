// Libs
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// Services
import { TeacherAPIService } from '../../services/teacher-api.service';

// Interfaces
import { IStudentIdpDetails } from '../../interfaces/IStudentIdpDetails';
import { IStudentIdpSummary } from '../../interfaces/IStudentIdpSummary';

// Constants
import { idpAnswerOptions } from '../../constants/idp-answer-options';
import { idpQuestion } from '../../constants/idp-questions';

/**
 * StudentIdpDetailsComponent
 *
 * Componente que representa a página que exibe os detalhes de um PDI cadastrado no sistema.
 */
@Component({
  selector: 'app-student-idp-details',
  templateUrl: './student-idp-details.component.html',
  styleUrls: ['./student-idp-details.component.scss'],
})
export class StudentIdpDetailsComponent implements OnInit {
  /**
   * Indica o estado de carregamento dos dados.
   *
   * @defaultValue `false`
   */
  public isLoading = false;

  /**
   * Opções de resposta utilizadas no formulário do PDI.
   */
  public answerOptions = [...idpAnswerOptions];

  /**
   * Grupos de perguntas utilizadas no formulário do PDI.
   */
  public questionGroups = [...idpQuestion];

  /**
   * Dados das respostas preenchidas no formulário do PDI do aluno.
   */
  public answerData: IStudentIdpDetails = {} as IStudentIdpDetails;

  /**
   * Informações detalhadas do aluno relacionadas ao PDI.
   */
  public student: IStudentIdpSummary = {} as IStudentIdpSummary;

  public studentId!: number;
  public idpId!: number;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _teacherApiService: TeacherAPIService
  ) {}

  /**
   * ngOnInit
   *
   * Busca o id nos parâmetros ao inicializar o componente e carrega as informações do aluno e do PDI.
   */
  public ngOnInit(): void {
    this._getRouteParamsId();
    this._initialize();
  }

  private _getRouteParamsId(): void {
    const studentId = this._activatedRoute.snapshot.paramMap.get('studentId');
    const idpId = this._activatedRoute.snapshot.paramMap.get('idpId');

    if (studentId && idpId) {
      this.studentId = Number(studentId);
      this.idpId = Number(idpId);
    }
  }

  private _initialize(): void {
    this._loadStudentIdpData();
  }

  /**
   * getAnswer
   *
   * Busca o texto da opção da opção que será exibida na tela com base no valor fornecido.
   *
   * @param value `number` que representa a opção preenchida no formulário do PDI.
   * @returns `string` que representa o texto que correspondente à resposta.
   */
  public getAnswer(value: number): string {
    const answer = this.answerOptions.find((answer) => answer.value === value);
    return answer ? answer.text : 'Sem resposta';
  }

  /**
   * _loadStudentIdpData
   *
   * Carrega os dados do PDI de um aluno, a partir do seu Id.
   *
   * @returns Uma `Promise` que resolve quando os dados forem carregados e atribuídos.
   */
  public async _loadStudentIdpData(): Promise<void> {
    this.answerData = await this._teacherApiService.getStudentIdp(
      this.studentId
    );
  }
}
