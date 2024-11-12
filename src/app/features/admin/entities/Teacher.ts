// Interfaces
import { ITeacher } from '../interfaces/ITeacher';
import { ITeacherFormValue } from '../interfaces/ITeacherFormValue';

export class Teacher {
  /**
   * Converte um objeto do tipo {@link ITeacher} para o formato do form {@link ITeacherFormValue}.
   *
   * @param teacher Objeto do tipo {@link ITeacher}.
   * @returns Um objeto do tipo {@link ITeacherFormValue}.
   * @remarks
   * Método `static`, não é necessário criar uma instância da classe para utilizá-lo.
   */
  public static toFormValue(teacher: ITeacher): ITeacherFormValue {
    return {
      teacherName: teacher.nomeCompleto,
      teacherCPF: teacher.cpf,
      enrollmentNumber: teacher.numeroMatricula,
      classrooms: teacher.turmas,
    };
  }

  /**
   * Converte um objeto do tipo {@link ITeacherFormValue} para o formato {@link ITeacher}.
   *
   * @param form Objeto do tipo {@link ITeacherFormValue}.
   * @returns Um objeto do tipo {@link ITeacher}.
   * @remarks
   * Método `static`, não é necessário criar uma instância da classe para utilizá-lo.
   */
  public static fromForm(form: ITeacherFormValue): ITeacher {
    return {
      nomeCompleto: form.teacherName,
      numeroMatricula: form.enrollmentNumber,
      cpf: form.teacherCPF,
      turmas: form.classrooms,
    };
  }
}
