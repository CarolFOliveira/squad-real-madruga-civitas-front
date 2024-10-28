// Libs
import { Component, OnInit } from '@angular/core';

// Interfaces
import { IBreadCrumbs } from '../../interfaces/IBreadCrumbs';

// Services
import { BreadcrumbsService } from '../../services/breadcrumbs.service';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
})
export class BreadcrumbsComponent implements OnInit {
  public breadcrumbs: IBreadCrumbs[] = [];

  constructor(private _breadcrumbsService: BreadcrumbsService) {}

  public ngOnInit(): void {
    this.breadcrumbs = this._breadcrumbsService.breadcrumbs;
  }
}
