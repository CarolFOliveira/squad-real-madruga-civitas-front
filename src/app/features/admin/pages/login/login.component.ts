import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  AuthService,
  LoginCredentials,
  LoginResponse,
} from 'src/app/core/auth/auth.service';
import { JwtService } from 'src/app/core/auth/jwt.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginFailed = false;
  loginForm = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(8),
      ]),
    },
    { updateOn: 'submit' }
  );

  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
    private router: Router
  ) {
    this.loginForm.valueChanges.subscribe(() => {
      this.loginFailed = false;
    });
  }

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
    const { token } = response;
    if (token) {
      this.jwtService.saveToken(token);
      // TODO: fazer o redirecionamento para a url correta
      this.router.navigate(['/']);
    }
  }

  private handleLoginError(error: HttpErrorResponse) {
    this.loginFailed = true;

    switch (error.status) {
      case 401:
        this.loginForm.setErrors({ unauthorized: true });
        break;

      // Remover esse caso (404) antes de fazer o PR
      case 404:
        this.loginForm.setErrors({ unauthorized: true });
        break;

      case 0:
        this.loginForm.setErrors({ noConnection: true });
        break;

      default:
        this.loginForm.setErrors({ serverError: true });
    }
  }
}
