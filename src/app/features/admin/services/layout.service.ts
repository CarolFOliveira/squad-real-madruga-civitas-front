import { BreakpointObserver } from '@angular/cdk/layout';
import { DestroyRef, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  private isMobile = new BehaviorSubject<boolean>(false);
  private isSidenavOpen = new BehaviorSubject<boolean>(false);

  isMobile$ = this.isMobile.asObservable();
  isSidenavOpen$ = this.isSidenavOpen.asObservable();

  constructor(
    private breakpointObserver: BreakpointObserver,
    private destroyRef: DestroyRef
  ) {
    this.breakpointObserver
      // TODO: utilizar breakpoint global
      .observe(`(max-width: 598px)`)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(({ matches }) => {
        this.isMobile.next(matches);
        this.isSidenavOpen.next(!matches);
      });
  }

  toggleSidenav(): void {
    const currentState = this.isSidenavOpen.value;
    this.isSidenavOpen.next(!currentState);
  }

  closeSidenav(): void {
    this.isSidenavOpen.next(false);
  }
}
