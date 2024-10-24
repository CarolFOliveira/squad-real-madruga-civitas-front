import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  template: `
    <mat-toolbar class="toolbar">
      <app-brand-link />
      <span class="toolbar__spacer"></span>
      <button mat-icon-button (click)="menuClick.emit()">
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
export class ToolbarComponent {
  /**
   * Emite um evento chamado `menuClick` quando o botão de menu é clicado.
   */
  @Output() menuClick = new EventEmitter<void>();
}
