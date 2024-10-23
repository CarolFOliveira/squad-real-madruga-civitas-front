import { Component } from '@angular/core';

@Component({
  selector: 'app-brand-link',
  template: `
    <div class="brand">
      <a class="brand__link" routerLink="/administrador">
        <mat-icon class="brand__icon material-icons-outlined">
          school
        </mat-icon>
      </a>
    </div>
  `,
  styles: [
    `
      .brand {
        &__link {
          color: inherit;
          display: block;
          margin: 0 auto;
          background-color: #fff;
          border-radius: 99px;
          font-size: 65px;
          height: 65px;
          text-align: center;
          transform: translateY(50%);
          width: 71px;
        }

        &__icon {
          font-size: 65px;
          height: 65px;
          text-align: center;
          width: 71px;
        }
        // TODO: criar breakpoints de forma global...
        @media screen and (min-width: 598px) {
          background-color: #fff;
        }
      }
    `,
  ],
})
export class BrandLinkComponent {}