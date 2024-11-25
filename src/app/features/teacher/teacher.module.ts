// Libs
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

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
import { StudentChartComponent } from './components/student-chart/student-chart.component';
import { StudentTableComponent } from './components/student-table/student-table.component';
import { TeacherLayoutComponent } from './components/teacher-layout/teacher-layout.component';
import { StudentIdpChartComponent } from './pages/student-idp-chart/student-idp-chart.component';
import { StudentIdpDetailsComponent } from './pages/student-idp-details/student-idp-details.component';
import { TeacherHomeComponent } from './pages/teacher-home/teacher-home.component';

const COMPONENTS = [
  StudentChartComponent,
  StudentIdpChartComponent,
  StudentIdpDetailsComponent,
  StudentTableComponent,
  TeacherHomeComponent,
  TeacherLayoutComponent,
];

const MODULES = [
  CommonModule,
  FormsModule,
  MatBadgeModule,
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule,
  MatSortModule,
  MatTableModule,
  MatTooltipModule,
  NgApexchartsModule,
  NgxSkeletonLoaderModule,
  ReactiveFormsModule,
  SharedModule,
  TeacherRoutingModule,
];

@NgModule({
  declarations: [...COMPONENTS],
  providers: [],
  imports: [...MODULES],
})
export class TeacherModule {}
