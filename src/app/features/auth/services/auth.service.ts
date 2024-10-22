// Libs
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, Observable, tap } from 'rxjs';

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
   * Será utilizado em toda a aplicação como um broadcast para monitorar o status de autenticação do usuário.
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

  /**
   * checkAuthenticationStatus
   *
   * Verifica o status de autenticação do usuário atual fazendo uma requisição para o backend.
   * Atualiza o observable<boolean> `isAuthenticated$` com base na resposta.
   *
   * @returns Um Observable que emite o objeto de resposta contendo o status:
   * * authenticated: `true` para autenticado
   * * authenticated: `false` para não autenticado
   */
  public checkAuthenticationStatus(): Observable<{ authenticated: boolean }> {
    return this.http
      .get<{ authenticated: boolean }>(`${environment.apiUrl}/membros/status`)
      .pipe(
        tap(({ authenticated }) => this.isAuthenticated$.next(authenticated))
      );
  }
}
