// Interfaces
import { IClassroom } from '../interfaces/IClassroom';
import { IClassroomFormValue } from '../interfaces/IClassroomFormValue';

/**
 * Classroom
 *
 * Responsável por realizar a conversão entre os modelos de dados utilizados pelo Back (em português)
 * e os valores do formulário `IClassroomFormValue`, que estão em inglês.
 *
 * @remarks
 * Possui métodos estáticos, portanto, não é necessário criar instâncias para utilizá-los.
 */
export class Classroom {
  /**
   * toFormValue
   *
   * Converte um objeto do tipo {@link IClassroom} para o formato do form {@link IClassroomFormValue}.
   *
   * @param classroom Objeto do tipo {@link IClassroom}.
   * @returns Um objeto do tipo {@link IClassroomFormValue}.
   * @remarks
   * Método `static`, não é necessário criar uma instância da classe para utilizá-lo.
   */
  public static toFormValue(classroom: IClassroom): IClassroomFormValue {
    return {
      academicYear: classroom.anoLetivo,
      alias: classroom.turmaApelido,
      classPeriod: classroom.periodoLetivo,
      educationLevel: classroom.ensino,
    };
  }

  /**
   * fromForm
   *
   * Converte um objeto do tipo {@link IClassroomFormValue} para o formato {@link IClassroom}.
   *
   * @param form Objeto do tipo {@link IClassroomFormValue}.
   * @returns Um objeto do tipo {@link IClassroom}.
   * @remarks
   * Método `static`, não é necessário criar uma instância da classe para utilizá-lo.
   */
  public static fromForm(form: IClassroomFormValue): IClassroom {
    return {
      anoLetivo: form.academicYear,
      ensino: form.educationLevel,
      periodoLetivo: form.classPeriod,
      turmaApelido: form.alias,
    };
  }
}
