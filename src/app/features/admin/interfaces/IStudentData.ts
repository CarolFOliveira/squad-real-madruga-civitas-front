/**
 * Representa os dados de um estudante para conseguir salvar ele no banco de dados.
 */
export interface IStudentData {
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
  enrollmentNumber: number;

  /**
   * A turma do estudante.
   */
  studentClass: string;

  /**
   * O CPF do responsável do estudante.
   */
  guardianCPF: string;
}
