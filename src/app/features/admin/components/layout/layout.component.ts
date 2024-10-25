// Libs
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

// Services
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'app-layout',
  template: `
    <app-toolbar *ngIf="isMobile" (menuClick)="toggleSidenav()" />
    <app-sidebar
      [mode]="isMobile ? 'over' : 'side'"
      [isSidenavOpen]="isSidenavOpen"
      (closeSidenav)="handleSidenavClose()"
    >
      <router-outlet></router-outlet>
    </app-sidebar>
  `,
})
export class LayoutComponent implements OnInit, OnDestroy {
  /**
   * Observable utilizado apenas para controlar o ciclo de vida
   * dos outros observables ao destruir o componente.
   */
  private destroy$ = new Subject<void>();

  /**
   * Indica se a aplicação está sendo exibida em uma viewport menor que 598px.
   *
   * @defaultValue `false`
   */
  isMobile = false;

  /**
   * Indica se a barra lateral está aberta ou fechada.
   *
   * @defaultValue `true`
   */
  isSidenavOpen = true;

  constructor(private layoutService: LayoutService) {}

  ngOnInit(): void {
    this.layoutService.isMobile$
      .pipe(takeUntil(this.destroy$))
      .subscribe((isMobile) => {
        this.isMobile = isMobile;
      });

    this.layoutService.isSidenavOpen$
      .pipe(takeUntil(this.destroy$))
      .subscribe((isOpen) => {
        this.isSidenavOpen = isOpen;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * toggleSidenav
   *
   * Inverte o valor de abertura da sidenav. Se era `false` fica `true` e vice-versa.
   */
  public toggleSidenav(): void {
    this.layoutService.toggleSidenav();
  }

  /**
   * handleSidenavClose
   *
   * Responsável por fechar a sidenav quando estiver no modo mobile.
   */
  public handleSidenavClose(): void {
    if (this.isMobile) this.layoutService.closeSidenav();
  }
}
