// Libs
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

// Interfaces
import { IStudentCreateRequest } from '../interfaces/IStudentCreateRequest';
import { IStudentCreateResponse } from '../interfaces/IStudentCreateResponse';

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
   * @param student - objeto do tipo {@link IStudentCreateRequest}
   * @returns Uma `Promise` contendo a resposta do backend do tipo {@link IStudentCreateResponse}.
   */
  public register(
    student: IStudentCreateRequest
  ): Promise<IStudentCreateResponse> {
    // TODO: conectar corretamente com o endpoint do back e ver como sera a resposta
    return firstValueFrom(
      this.http.post<IStudentCreateResponse>('/alunos', student)
    );
  }
}
