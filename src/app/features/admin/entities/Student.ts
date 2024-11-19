// Interfaces
import { IStudent } from '../interfaces/IStudent';
import { IStudentFormValue } from '../interfaces/IStudentFormValue';

/**
 * Student
 *
 * Responsável por realizar a conversão entre os modelos de dados utilizados pelo Back (em português)
 * e os valores do formulário `IStudentFormValue`, que estão em inglês.
 *
 * @remarks
 * Possui métodos estáticos, portanto, não é necessário criar instâncias para utilizá-los.
 */
export class Student {
  /**
   * toFormValue
   *
   * Converte um objeto do tipo {@link IStudent} para o formato do form {@link IStudentFormValue}.
   *
   * @param student Objeto do tipo {@link IStudent}.
   * @returns Um objeto do tipo {@link IStudentFormValue}.
   * @remarks
   * Método `static`, não é necessário criar uma instância da classe para utilizá-lo.
   */
  public static toFormValue(student: IStudent): IStudentFormValue {
    return {
      enrollmentNumber: student.numeroMatricula,
      guardianCPF: student.responsavelCpf,
      studentClass: student.turmaId,
      studentName: student.nomeCompleto,
      studentRG: student.rg,
    };
  }

  /**
   * fromForm
   *
   * Converte um objeto do tipo {@link IStudentFormValue} para o formato {@link IStudent}.
   *
   * @param form Objeto do tipo {@link IStudentFormValue}.
   * @returns Um objeto do tipo {@link IStudent}.
   * @remarks
   * Método `static`, não é necessário criar uma instância da classe para utilizá-lo.
   */
  public static fromForm(form: IStudentFormValue): IStudent {
    return {
      nomeCompleto: form.studentName,
      numeroMatricula: form.enrollmentNumber,
      responsavelCpf: form.guardianCPF,
      rg: form.studentRG,
      turmaId: form.studentClass,
    };
  }
}
