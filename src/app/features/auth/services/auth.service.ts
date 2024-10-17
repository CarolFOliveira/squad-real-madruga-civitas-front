import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { ILoginRequest } from './interfaces/ILoginRequest';
import { ILoginResponse } from './interfaces/ILoginResponse';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  /**
   * login
   *
   * Autentica um usuário enviando suas credenciais de login para o backend.
   *
   * @param credentials - As credenciais de login do usuário
   * @param credentials.email - O endereço de e-mail do usuário
   * @param credentials.password - A senha do usuário
   * @returns Uma `Promise` contendo a resposta, que inclui um `token` se a autenticação for bem-sucedida.
   *
   * @example
   * ```ts
   * const credentials: ILoginRequest = { email: 'user@example.com', password: 'password123' };
   * try {
   *    const response = await this.authService.login(credentials);
   *    //...
   * } catch (error) {
   *    //...
   * }
   * ```
   */
  public async login(credentials: ILoginRequest): Promise<ILoginResponse> {
    return firstValueFrom(
      this.http.post<ILoginResponse>('/api/login', credentials)
    );
  }
}
