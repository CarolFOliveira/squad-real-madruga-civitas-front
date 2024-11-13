/**
 * ITeacher
 *
 * Interface que representa como os dados do professor foram definidos pelo backend.
 */
export interface ITeacher {
  id?: number;
  numeroMatricula: string;
  nomeCompleto: string;
  cpf: string;
  turmas: number[];
}
