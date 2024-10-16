import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import {
  AdminLoginCredentials,
  AdminLoginResponse,
} from 'src/app/shared/interfaces/auth.interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(credentials: AdminLoginCredentials) {
    // TODO: conectar corretamente com o endpoint da API
    return this.http.post<AdminLoginResponse>('/api/login', credentials);
  }
}
