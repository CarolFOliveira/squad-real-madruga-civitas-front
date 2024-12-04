/**
 * IStudentIdpDetails
 *
 * Interface que representa os detalhes de um PDI (Plano de Desenvolvimento Individual) de um aluno.
 *
 * @remarks
 * O PDI é divido em 3 seções:
 * - **Desenvolvimento Acadêmico**: habilidades relacionadas ao desempenho acadêmico.
 * - **Inteligência Emocional**: competências emocionais e sociais.
 * - **Responsabilidade**: atitudes relacionadas à responsabilidade individual e coletiva.
 */
export interface IStudentIdpDetails {
  /** Seção: Desenvolvimento Acadêmico */
  interestEngagement: number;
  concentrationAbility: number;
  activeParticipation: number;
  practicalApplication: number;
  helpSeekingInitiative: number;
  /** Seção: Inteligência Emocional */
  frustrationTolerance: number;
  conflictResolution: number;
  adaptationAbility: number;
  empathyRespect: number;
  collaborativeAttitude: number;
  /** Seção: Responsabilidade */
  punctuality: number;
  collectiveResponsibility: number;
  schoolRulesRespect: number;
  resourceResponsibility: number;
  activityPlanning: number;
  /** Comentários gerais sobre o aluno */
  comments: string;
  /** Médias das avaliações atuais */
  averages: number[];
  /** Médias de avaliações anteriores */
  previousIdpAverages: number[];
  /** Data de registro do PDI */
  registrationDate: string;
  [key: string]: string | number | number[];
}
