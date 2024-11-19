// Libs
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// App Modules
import { SharedModule } from '../../shared/shared.module';
import { TeacherRoutingModule } from './teacher-routing.module';

// Angular Material Modules
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
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
  MatTableModule,
  MatTooltipModule,
  SharedModule,
  TeacherRoutingModule,
];

@NgModule({
  declarations: [...COMPONENTS],
  providers: [],
  imports: [...MODULES],
})
export class TeacherModule {}
