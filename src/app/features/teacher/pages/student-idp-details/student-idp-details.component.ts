// Libs
import { Component } from '@angular/core';

// Interfaces
import { IStudentIDPForm } from '../../interfaces/IStudentIDPForm';

// Constants
import { idpAnswerOptions } from '../../constants/idp-answer-options';
import { idpQuestion } from '../../constants/idp-questions';

@Component({
  selector: 'app-student-idp-details',
  templateUrl: './student-idp-details.component.html',
  styleUrls: ['./student-idp-details.component.scss'],
})
export class StudentIdpDetailsComponent {
  public answerOptions = [...idpAnswerOptions];
  public questionGroups = [...idpQuestion];

  // TODO: buscar valores no backend
  public answerData: IStudentIDPForm = {
    interestEngagement: 3,
    performanceTests: 4,
    concentrationAbility: 2,
    deadlineSkills: 5,
    contentProgress: 1,
    frustrationTolerance: 3,
    emotionExpression: 4,
    conflictResolution: 2,
    adaptationAbility: 5,
    empathyRespect: 4,
    punctuality: 3,
    taskCompletion: 1,
    materialOrganization: 5,
    collectiveResponsibility: 2,
    schoolRulesRespect: 4,
    comments: 'Teste',
  };

  public getAnswer(value: string | number): string | undefined {
    return this.answerOptions.find((answer) => answer.value === value)?.text;
  }
}
