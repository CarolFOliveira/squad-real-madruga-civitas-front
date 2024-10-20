import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-return-button',
  template: `
    <button
      mat-icon-button
      [routerLink]="routerLink"
      [ngClass]="{ hidden: isHomePage }"
    >
      <mat-icon>arrow_back</mat-icon>
    </button>
  `,
  styles: [
    `
      button {
        height: 65px;

        &.hidden {
          visibility: hidden;
        }
      }
    `,
  ],
})
export class ReturnButtonComponent implements OnInit {
  @Input() routerLink = '..';

  /**
   * Se for a pagina inicial, não deve mostrar o botão.
   */
  isHomePage = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.checkHomePage();
  }

  /**
   * Verifica se a rota atual é a pagina inicial.
   */
  private checkHomePage(): void {
    this.isHomePage = this.router.url === '/';
  }
}
