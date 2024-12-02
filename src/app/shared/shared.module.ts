// Libs
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

// Angular Material Modules
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';

// Components
import { BrandLinkComponent } from './components/brand-link/brand-link.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { ButtonComponent } from './components/button/button.component';
import { CardComponent } from './components/card/card.component';
import { InputComponent } from './components/input/input.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ReturnButtonComponent } from './components/return-button/return-button.component';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { SelectComponent } from './components/select/select.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { VideoDialogComponent } from './components/video-dialog/video-dialog.component';

// Pipes
import { PerformanceClassPipe } from './pipes/performance-class.pipe';

const PIPES = [PerformanceClassPipe];

const COMPONENTS = [
  BrandLinkComponent,
  BreadcrumbsComponent,
  ButtonComponent,
  CardComponent,
  InputComponent,
  PaginationComponent,
  ReturnButtonComponent,
  SearchbarComponent,
  SelectComponent,
  ToolbarComponent,
  VideoDialogComponent,
];

const MODULES = [
  CommonModule,
  FormsModule,
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatToolbarModule,
  ReactiveFormsModule,
];

@NgModule({
  declarations: [...COMPONENTS, ...PIPES],
  providers: [provideNgxMask()],
  imports: [...MODULES, NgxMaskDirective, NgxMaskPipe, RouterLink],
  exports: [...COMPONENTS, ...PIPES],
})
export class SharedModule {}
