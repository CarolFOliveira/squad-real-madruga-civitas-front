// Libs
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// Services
import { StorageService } from 'src/app/shared/services/storage.service';
import { AuthService } from '../services/auth.service';

// Interfaces
import { ILoginCredentials } from '../interfaces/ILoginCredentials';
import { ILoginResponse } from '../interfaces/ILoginResponse';

// Enum
import { EnumRoles } from 'src/app/shared/enums/EnumRoles';

/**
 * LoginComponent
 *
 * Componente que representa a página que exibe o login para o usuário.
 *
 * Este componente gerencia a interface e a lógica de autenticação de usuários.
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  /**
   * Indica se ocorreu um erro durante o processo de login.
   *
   * Utilizada para controlar a exibição de mensagens de erro para o usuário.
   */
  public loginFailed = false;

  /**
   * Indica se o formulário está em processo de submissão para o backend.
   */
  public isSubmitting = false;

  /**
   * Formulário de login do administrador com as devidas validações.
   */
  public loginForm = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    },
    { updateOn: 'submit' }
  );

  constructor(
    private _authService: AuthService,
    private _storageService: StorageService,
    private _router: Router
  ) {}

  /**
   * onSubmit
   *
   * Lida com o evento de submissão do formulário de login do administrador.
   *
   * @param $event - Evento do tipo `SubmitEvent` de envio de um formulário no navegador.
   * @returns Uma `Promise` vazia que é resolvida após o processo de login ser concluído.
   * @remarks
   * Responsável por todo o processo de login, incluindo validação do formulário,
   * envio das credenciais para autenticação e tratamento de respostas de sucesso ou erro.
   */
  public async onSubmit($event: SubmitEvent): Promise<void> {
    $event.preventDefault();
    this.isSubmitting = true;

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.isSubmitting = false;
      return;
    }
    const credentials = this.loginForm.value as ILoginCredentials;

    try {
      const response = await this._authService.login(credentials);
      this._handleLoginSuccess(response);
    } catch (error) {
      this._handleLoginError(error as HttpErrorResponse);
    } finally {
      this.isSubmitting = false;
    }
  }

  /**
   * _handleLoginSuccess
   *
   * Realiza as ações necessárias, como salvar o token de autenticação e redirecionar o usuário.
   *
   * @param response - A resposta do servidor do tipo {@link ILoginResponse}.
   * @remarks
   * - Utiliza o serviço do token para armazenar ele no localStorage.
   * - Redireciona o usuário para a página inicial do respectivo usuário após o login bem-sucedido.
   */
  private _handleLoginSuccess(response: ILoginResponse): void {
    const { token, tipoConta } = response;

    if (token) {
      const routeMap = {
        [EnumRoles.ADMIN]: 'administrador',
        [EnumRoles.TEACHER]: 'professor',
        [EnumRoles.STUDENT]: 'aluno',
        [EnumRoles.GUARDIAN]: 'aluno',
      };
      const route = routeMap[tipoConta as EnumRoles];

      this._storageService.saveItem('jwtToken', token);
      this._router.navigate([route]);
    }
  }

  /**
   * _handleLoginError
   *
   * Trata erros ocorridos durante o processo de login.
   *
   * @param error - Objeto de resposta do erro HTTP `HttpErrorResponse`
   * @remarks
   * Marca que o login como falhou e define erros apropriados no formulário de login com base no status do erro.
   * - Se o status do erro for `401` (Não autorizado) - define um erro de "não autorizado" no formulário
   * - Se o status do erro for `0` (Sem conexão), define um erro de "sem conexão" no formulário
   * - Para outros status de erro,define um erro genérico de "erro do servidor" no formulário
   */
  private _handleLoginError(error: HttpErrorResponse): void {
    this.loginFailed = true;

    switch (error.status) {
      case 400:
      case 401:
        this.loginForm.setErrors({ unauthorized: true });
        break;

      case 0 && error.error instanceof ProgressEvent:
        this.loginForm.setErrors({ noConnection: true });
        break;

      default:
        this.loginForm.setErrors({ serverError: true });
    }
  }
}
