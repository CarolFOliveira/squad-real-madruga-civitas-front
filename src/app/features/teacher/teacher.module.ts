// Libs
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// App Modules
import { SharedModule } from '../../shared/shared.module';
import { TeacherRoutingModule } from './teacher-routing.module';

// Angular Material Modules
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

// Components
import { TeacherLayoutComponent } from './components/teacher-layout/teacher-layout.component';
import { TeacherHomeComponent } from './pages/teacher-home/teacher-home.component';

const COMPONENTS = [TeacherLayoutComponent, TeacherHomeComponent];

const MODULES = [
  CommonModule,
  MatBadgeModule,
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatSelectModule,
  MatSortModule,
  MatTableModule,
  MatInputModule,
  MatTooltipModule,
  FormsModule,
  SharedModule,
  TeacherRoutingModule,
];

@NgModule({
  declarations: [...COMPONENTS],
  providers: [],
  imports: [...MODULES],
})
export class TeacherModule {}
