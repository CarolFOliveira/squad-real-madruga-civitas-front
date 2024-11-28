/**
 * IStudent
 *
 * Interface que representa como os dados do aluno foram definidos pelo backend.
 */
export interface IStudent {
  id?: number;
  numeroMatricula: string;
  nomeCompleto: string;
  email: string;
  turmaId: string;
  responsavelCpf: string;
}
