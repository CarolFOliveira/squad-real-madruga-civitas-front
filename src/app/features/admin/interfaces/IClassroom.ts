/**
 * IClassroom
 *
 * Interface que representa como os dados da turma foram definidos pelo backend.
 */
export interface IClassroom {
  id?: number;
  anoLetivo: string;
  periodoLetivo: string;
  ensino: string;
  turmaApelido: string;
}
