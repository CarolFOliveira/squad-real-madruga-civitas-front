/**
 * ITeacherFormValue
 *
 * Interface que representa os dados dos campos do formulário do professor.
 */
export interface ITeacherFormValue {
  teacherName: string;
  teacherCPF: string;
  email: string;
  enrollmentNumber: string;
  classrooms: number[];
}
