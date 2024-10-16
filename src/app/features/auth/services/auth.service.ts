import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {
  LoginCredentials,
  LoginResponse,
} from 'src/app/shared/interfaces/auth.interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  // TODO: mudar essa implementação para promises.

  /**
   * login
   *
   * Autentica um usuário enviando suas credenciais de login para o backend.
   *
   * @param credentials - As credenciais de login do usuário
   * @param credentials.email - O endereço de e-mail do usuário
   * @param credentials.password - A senha do usuário
   * @returns Um `Observable` contendo a resposta de login, que inclui um token se a autenticação for bem-sucedida.
   */
  public login(credentials: LoginCredentials): Observable<LoginResponse> {
    // TODO: conectar corretamente com o endpoint da API
    return this.http.post<LoginResponse>('/api/login', credentials);
  }
}
