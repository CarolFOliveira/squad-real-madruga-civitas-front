import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-layout',
  template: `
    <app-sidebar [isSidenavOpen]="isSidenavOpen">
      <app-toolbar *ngIf="isMobile" />
      <router-outlet></router-outlet>
    </app-sidebar>
  `,
})
export class LayoutComponent implements OnInit {
  /**
   * Indica se a aplicação está sendo exibida em uma viewport menor que 598px.
   * @defaultValue `false`
   */
  isMobile = false;

  /**
   * Indica se a barra lateral está aberta ou fechada.
   * @defaultValue `true`
   */
  isSidenavOpen = true;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit(): void {
    this.breakpointObserver
      // TODO: utilizar breakpoint global
      .observe(`(max-width: 598px)`)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(({ matches }) => {
        this.isMobile = matches;
        this.isSidenavOpen = !matches;
      });
  }
}
