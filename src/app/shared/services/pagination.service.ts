import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaginationService {
  private _currentPage = 1;
  public currentPage$ = new Subject<number>();

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {
    this._activatedRoute.queryParams.subscribe((params) => {
      this._currentPage = params['page'] ? Number(params['page']) : 1;
      this.currentPage$.next(this._currentPage);
    });
  }

  public setCurrentPage(page: number): void {
    this._currentPage = page;
    this._router.navigate([], {
      relativeTo: this._activatedRoute,
      queryParams: { page: this._currentPage },
      queryParamsHandling: 'merge',
    });

    this.currentPage$.next(this._currentPage);
  }

  public getCurrentPage(): number {
    return this._currentPage;
  }
}
