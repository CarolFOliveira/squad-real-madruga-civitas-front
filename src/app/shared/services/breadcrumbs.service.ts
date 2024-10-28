//Libs
import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

// Interfaces
import { IBreadCrumbs } from '../interfaces/IBreadCrumbs';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbsService {
  public breadcrumbs: IBreadCrumbs[] = [];

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {
    this._router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.breadcrumbs = this.createBreadcrumbs(this._activatedRoute.root);
      });
  }

  private createBreadcrumbs(
    activatedRoute: ActivatedRoute,
    breadcrumbs: IBreadCrumbs[] = [],
    url = ''
  ): IBreadCrumbs[] {
    const childrenRoutes: ActivatedRoute[] = activatedRoute.children;
    if (childrenRoutes.length === 0) return breadcrumbs;

    for (const childRoute of childrenRoutes) {
      const urlSegments = childRoute.snapshot.url
        .map((segment) => segment.path)
        .join('/');

      if (urlSegments) {
        url += `/${urlSegments}`;
        breadcrumbs.push({
          label: childRoute.snapshot.data['breadcrumb'],
          url,
        });
      }
      this.createBreadcrumbs(childRoute, breadcrumbs, url);
    }

    return breadcrumbs;
  }
}
