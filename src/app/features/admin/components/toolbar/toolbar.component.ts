import { Component } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  template: `
    <mat-toolbar class="toolbar">
      <app-brand-link />
      <span class="toolbar__spacer"></span>
      <button mat-icon-button>
        <mat-icon>menu</mat-icon>
      </button>
    </mat-toolbar>
  `,
  styles: [
    `
      .toolbar {
        background: #dbd5e9;
        height: 65px;
        padding-inline-start: 25px;

        &__spacer {
          flex: 1 1 auto;
        }
      }
    `,
  ],
})
export class ToolbarComponent {}
