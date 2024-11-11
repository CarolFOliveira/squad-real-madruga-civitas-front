// Interfaces
import { IClassroom } from '../interfaces/IClassroom';
import { IClassroomFormValue } from '../interfaces/IClassroomFormValue';

export class Classroom {
  /**
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
