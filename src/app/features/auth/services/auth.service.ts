import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  token?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(credentials: LoginCredentials) {
    // TODO: conectar corretamente com o endpoint da API
    return this.http.post<LoginResponse>('/api/login', credentials);
  }
}
