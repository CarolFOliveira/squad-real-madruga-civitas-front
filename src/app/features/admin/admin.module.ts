// Libs
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

// Angular Material Modules
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';

// App Modules
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';

// Services
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

// Components
import { BrandLinkComponent } from './components/brand-link/brand-link.component';
import { LayoutComponent } from './components/layout/layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { StudentRegistrationComponent } from './pages/student-registration/student-registration.component';

const COMPONENTS = [
  BrandLinkComponent,
  DashboardComponent,
  LayoutComponent,
  SidebarComponent,
  StudentRegistrationComponent,
  ToolbarComponent,
];

@NgModule({
  declarations: [...COMPONENTS],
  providers: [SnackbarService],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatToolbarModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class AdminModule {}
