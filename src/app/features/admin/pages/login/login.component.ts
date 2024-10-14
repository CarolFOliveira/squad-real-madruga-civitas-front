import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  AuthService,
  LoginCredentials,
  LoginResponse,
} from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(8),
    ]),
  });

  constructor(private authService: AuthService) {}

  onSubmit($event: SubmitEvent) {
    $event.preventDefault();
    if (this.loginForm.invalid) return;

    this.loginForm.markAsPending();

    const credentials = this.loginForm.value as LoginCredentials;
    this.authService.login(credentials).subscribe({
      next: (response) => this.handleLoginSuccess(response),
      error: (error: HttpErrorResponse) => this.handleLoginError(error),
    });
  }

  private handleLoginSuccess(response: LoginResponse) {
    console.log(response);
  }

  private handleLoginError(error: HttpErrorResponse) {
    switch (error.status) {
      case 401:
        this.loginForm.setErrors({ unauthorized: true });
        break;

      // Remover esse caso (404) antes de fazer o PR
      case 404:
        this.loginForm.setErrors({ unauthorized: true });
        break;

      case 0:
        console.log('Sem conexão com a internet.');
        break;

      default:
        console.log('Erro inesperado.');
    }
  }
}
