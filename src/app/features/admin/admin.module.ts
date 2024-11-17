// Libs
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

// Angular Material Modules
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';

// App Modules
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';

// Components
import { ActionDialogComponent } from './components/action-dialog/action-dialog.component';
import { ActionMenuComponent } from './components/action-menu/action-menu.component';
import { EntityListComponent } from './components/entity-list/entity-list.component';
import { LayoutComponent } from './components/layout/layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { VideoDialogComponent } from './components/video-dialog/video-dialog.component';
import { ClassroomListComponent } from './pages/classroom-list/classroom-list.component';
import { ClassroomUpsertComponent } from './pages/classroom-upsert/classroom-upsert.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { StudentListComponent } from './pages/student-list/student-list.component';
import { StudentUpsertComponent } from './pages/student-upsert/student-upsert.component';
import { TeacherListComponent } from './pages/teacher-list/teacher-list.component';
import { TeacherUpsertComponent } from './pages/teacher-upsert/teacher-upsert.component';

const COMPONENTS = [
  ActionDialogComponent,
  ActionMenuComponent,
  ClassroomUpsertComponent,
  ClassroomListComponent,
  DashboardComponent,
  EntityListComponent,
  LayoutComponent,
  SidebarComponent,
  StudentUpsertComponent,
  StudentListComponent,
  TeacherUpsertComponent,
  TeacherListComponent,
  VideoDialogComponent,
];

const MODULES = [
  AdminRoutingModule,
  CommonModule,
  MatButtonModule,
  MatDialogModule,
  MatIconModule,
  MatListModule,
  MatMenuModule,
  MatSidenavModule,
  ReactiveFormsModule,
  SharedModule,
];

@NgModule({
  declarations: [...COMPONENTS],
  providers: [],
  imports: [...MODULES],
})
export class AdminModule {}
