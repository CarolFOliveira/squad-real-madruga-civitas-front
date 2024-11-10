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
import { MatToolbarModule } from '@angular/material/toolbar';

// App Modules
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';

// Components
import { ActionDialogComponent } from './components/action-dialog/action-dialog.component';
import { ActionMenuComponent } from './components/action-menu/action-menu.component';
import { BrandLinkComponent } from './components/brand-link/brand-link.component';
import { EntityListComponent } from './components/entity-list/entity-list.component';
import { LayoutComponent } from './components/layout/layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { VideoDialogComponent } from './components/video-dialog/video-dialog.component';
import { ClassroomCreateComponent } from './pages/classroom-create/classroom-create.component';
import { ClassroomListComponent } from './pages/classroom-list/classroom-list.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { StudentCreateComponent } from './pages/student-create/student-create.component';
import { StudentListComponent } from './pages/student-list/student-list.component';
import { TeacherCreateComponent } from './pages/teacher-create/teacher-create.component';
import { TeacherListComponent } from './pages/teacher-list/teacher-list.component';

const COMPONENTS = [
  ActionDialogComponent,
  ActionMenuComponent,
  BrandLinkComponent,
  ClassroomCreateComponent,
  ClassroomListComponent,
  DashboardComponent,
  EntityListComponent,
  LayoutComponent,
  SidebarComponent,
  StudentCreateComponent,
  StudentListComponent,
  TeacherCreateComponent,
  TeacherListComponent,
  ToolbarComponent,
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
  MatToolbarModule,
  ReactiveFormsModule,
  SharedModule,
];

@NgModule({
  declarations: [...COMPONENTS],
  providers: [],
  imports: [...MODULES],
})
export class AdminModule {}
