// Libs
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

// Angular Material Modules
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';

// Modules
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';

// Components
import { StudentRegistrationComponent } from './pages/student-registration/student-registration.component';

// Services
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@NgModule({
  declarations: [StudentRegistrationComponent],
  providers: [SnackbarService],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class AdminModule {}
