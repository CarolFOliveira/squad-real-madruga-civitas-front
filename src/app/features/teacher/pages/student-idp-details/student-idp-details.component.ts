// Libs
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// Services
import { TeacherService } from '../../services/teacher.service';

// Interfaces
import { IStudentIDPForm } from '../../interfaces/IStudentIDPForm';
import { IStudentIDPSummary } from '../../interfaces/IStudentIDPSummary';

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
  public answerData: IStudentIDPForm = {} as IStudentIDPForm;

  /**
   * Informações detalhadas do aluno relacionadas ao PDI.
   */
  public student: IStudentIDPSummary = {} as IStudentIDPSummary;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _teacherService: TeacherService
  ) {}

  /**
   * ngOnInit
   *
   * Busca o id nos parâmetros ao inicializar o componente e carrega as informações do aluno.
   */
  public ngOnInit(): void {
    const studentId = this._activatedRoute.snapshot.paramMap.get('id');
    this._loadStudentIDPData(studentId);
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
   * _loadStudentIDPData
   *
   * Carrega os dados do PDI de um aluno, a partir do seu Id.
   *
   * @param studentId - O Id do aluno, que pode ser uma `string` ou `null`.
   * @returns Uma `Promise` que resolve quando os dados forem carregados e atribuídos.
   */
  public async _loadStudentIDPData(studentId: string | null): Promise<void> {
    const response = await this._teacherService.getStudentPDI(studentId);
    this.student = response.student;
    this.answerData = response.answerData;
  }
}
