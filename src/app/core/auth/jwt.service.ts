import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  readonly TOKEN = 'jwtToken';

  getToken(): string {
    return localStorage[this.TOKEN];
  }

  saveToken(token: string): void {
    localStorage[this.TOKEN] = token;
  }

  destroyToken(): void {
    localStorage.removeItem(this.TOKEN);
  }
}
