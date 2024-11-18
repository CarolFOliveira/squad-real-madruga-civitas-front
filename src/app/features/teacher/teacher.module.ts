// Libs
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// App Modules
import { SharedModule } from '../../shared/shared.module';
import { TeacherRoutingModule } from './teacher-routing.module';

// Angular Material Modules
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
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
  MatIconModule,
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
