// Libs
import { Component, OnInit } from '@angular/core';

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
export class LayoutComponent implements OnInit {
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
    this.layoutService.isMobile$.subscribe((isMobile) => {
      this.isMobile = isMobile;
    });

    this.layoutService.isSidenavOpen$.subscribe((isOpen) => {
      this.isSidenavOpen = isOpen;
    });
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
