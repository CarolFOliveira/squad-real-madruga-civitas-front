// Libs
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, tap } from 'rxjs';

// Interfaces
import { ILoginRequest } from '../interfaces/ILoginRequest';
import { ILoginResponse } from '../interfaces/ILoginResponse';

// Env variables
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /**
   * Será utilizado em toda a aplicação (source of true) para saber se o usuário está ou não autenticado.
   */
  isAuthenticated$ = new BehaviorSubject(false);

  constructor(private http: HttpClient) {}

  /**
   * login
   *
   * Autentica um usuário enviando suas credenciais de login para o backend.
   *
   * Após a autenticação com o back, marca `isAuthenticated$` como `true` para indicar que o usuário está autenticado.
   *
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
  public login(credentials: ILoginRequest): Promise<ILoginResponse> {
    return firstValueFrom(
      this.http
        .post<ILoginResponse>(`${environment.apiUrl}/admin/login`, {
          email: credentials.email,
          senha: credentials.password,
        })
        .pipe(
          tap(() => {
            this.isAuthenticated$.next(true);
          })
        )
    );
  }
}
