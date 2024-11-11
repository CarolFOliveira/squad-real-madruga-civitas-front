/**
 * Representa os dados dos campos do formulário de estudante.
 */
export interface IStudentFormValue {
  /**
   * O nome completo do estudante.
   */
  studentName: string;

  /**
   * O RG do estudante.
   */
  studentRG: string;

  /**
   * O número de matrícula do estudante.
   */
  enrollmentNumber: string;

  /**
   * A turma do estudante.
   */
  studentClass: string;

  /**
   * O CPF do responsável do estudante.
   */
  guardianCPF: string;
}
