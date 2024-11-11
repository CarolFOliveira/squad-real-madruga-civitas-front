// Interfaces
import { IStudent } from '../interfaces/IStudent';
import { IStudentFormValue } from '../interfaces/IStudentFormValue';

export class StudentDTO {
  nomeCompleto: string;
  numeroMatricula: string;
  responsavelCpf: string;
  rg: string;
  turmaId: string;

  constructor(student: IStudent) {
    this.nomeCompleto = student.nomeCompleto;
    this.numeroMatricula = student.numeroMatricula;
    this.responsavelCpf = student.responsavelCpf;
    this.rg = student.rg;
    this.turmaId = student.turmaId;
  }

  public toFormValue(): IStudentFormValue {
    return {
      enrollmentNumber: this.numeroMatricula,
      guardianCPF: this.responsavelCpf,
      studentClass: this.turmaId,
      studentName: this.nomeCompleto,
      studentRG: this.rg,
    };
  }

  static fromForm(form: IStudentFormValue): IStudent {
    return {
      nomeCompleto: form.studentName,
      numeroMatricula: form.enrollmentNumber,
      responsavelCpf: form.guardianCPF,
      rg: form.studentRG,
      turmaId: form.studentClass,
    };
  }
}
