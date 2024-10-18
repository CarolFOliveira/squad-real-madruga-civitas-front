// Libs
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// Interfaces
import { firstValueFrom } from 'rxjs';
import { IStudentData } from '../pages/interfaces/IStudentData';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private http: HttpClient) {}

  /**
   * registerStudent
   *
   * Registra um aluno enviando suas informações para o backend.
   *
   * @param student - Os dados do aluno a ser cadastrado
   * @param student.studentName - Nome do aluno
   * @param student.studentRG - RG do aluno
   * @param student.enrollmentNumber - Número da matrícula
   * @param student.studentClass - Turma do aluno
   * @param student.guardianCPF - CPF do responsável pelo o aluno
   * @returns Uma `Promise` contendo a resposta do backend.
   */
  register(student: IStudentData): Promise<unknown> {
    // TODO: conectar corretamente com o endpoint do back e ver como sera a resposta
    return firstValueFrom(this.http.post('/api/url', student));
  }
}
