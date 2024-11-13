/**
 * IStudentFormValue
 *
 * Interface que representa os dados dos campos do formulário de aluno.
 */
export interface IStudentFormValue {
  /**
   * O nome completo do aluno.
   */
  studentName: string;

  /**
   * O RG do aluno.
   */
  studentRG: string;

  /**
   * O número de matrícula do aluno.
   */
  enrollmentNumber: string;

  /**
   * A turma do aluno.
   */
  studentClass: string;

  /**
   * O CPF do responsável do aluno.
   */
  guardianCPF: string;
}
