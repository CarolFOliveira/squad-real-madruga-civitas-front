import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, DestroyRef, ElementRef, OnInit } from '@angular/core';
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
  isMobile = false;
  isSidenavOpen = true;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private destroyRef: DestroyRef,
    private elementRef: ElementRef
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
