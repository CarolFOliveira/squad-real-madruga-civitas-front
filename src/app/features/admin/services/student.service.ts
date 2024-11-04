// Libs
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

// Interfaces
import { IStudentData } from '../interfaces/IStudentData';
import { IStudentDataResponse } from '../interfaces/IStudentDataResponse';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private http: HttpClient) {}

  /**
   * register
   *
   * Registra um aluno enviando suas informações para o backend.
   *
   * @param student - objeto do tipo {@link IStudentData}
   *
   * @returns Uma `Promise` contendo a resposta do backend do tipo {@link IStudentDataResponse}.
   */
  public register(student: IStudentData): Promise<IStudentDataResponse> {
    // TODO: conectar corretamente com o endpoint do back e ver como sera a resposta
    return firstValueFrom(
      this.http.post<IStudentDataResponse>('/alunos', student)
    );
  }
}
