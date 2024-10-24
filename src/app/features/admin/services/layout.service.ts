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

  /**
   * `Observable<boolean>` que emite um valor `boolean` indicando se a aplicação está em modo mobile.
   * O valor é atualizado sempre que a viewport passa do breakpoint (598px)
   */
  isMobile$ = this.isMobile.asObservable();

  /**
   * `Observable<boolean>` que emite um valor `boolean` indicando se a sidenav está aberta ou não.
   * O valor é atualizado sempre que o estado da sidenav muda.
   */
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

  /**
   * toggleSidenav
   *
   * Inverte o estado da sidenav e notifica todos os componentes inscritos.
   */
  public toggleSidenav(): void {
    const currentState = this.isSidenavOpen.value;
    this.isSidenavOpen.next(!currentState);
  }

  /**
   * closeSidenav
   *
   * Altera o estado da sidenav para fechada `false` e notifica todos os componentes que dependem desse estado.
   */
  public closeSidenav(): void {
    this.isSidenavOpen.next(false);
  }
}
