// Libs
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

// Angular Material Modules
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// Modules
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';

// Components
import { StudentRegistrationComponent } from './pages/student-registration/student-registration.component';

@NgModule({
  declarations: [StudentRegistrationComponent],
  providers: [],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    MatIconModule,
    MatButtonModule,
  ],
})
export class AdminModule {}
