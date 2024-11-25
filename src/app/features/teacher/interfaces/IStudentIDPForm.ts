/**
 * IStudentIDPForm
 *
 * Interface que representa a estrutura do formulário de um PDI (Plano de Desenvolvimento Individual).
 */
export interface IStudentIDPForm {
  interestEngagement: number;
  performanceTests: number;
  concentrationAbility: number;
  deadlineSkills: number;
  contentProgress: number;
  frustrationTolerance: number;
  emotionExpression: number;
  conflictResolution: number;
  adaptationAbility: number;
  empathyRespect: number;
  punctuality: number;
  taskCompletion: number;
  materialOrganization: number;
  collectiveResponsibility: number;
  schoolRulesRespect: number;
  comments: string;
  [key: string]: string | number;
}
