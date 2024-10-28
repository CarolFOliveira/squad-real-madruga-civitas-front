// Libs
import { Component } from '@angular/core';

// Interfaces
import { IBreadCrumbs } from '../../interfaces/IBreadCrumbs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
})
export class BreadcrumbsComponent {
  public breadcrumbs: IBreadCrumbs[] = [];
}
