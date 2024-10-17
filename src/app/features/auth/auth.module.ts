// Libs
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

// Angular Material Modules
import { MatButtonModule } from '@angular/material/button';

// App Modules
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';

// Components
import { AdminLoginComponent } from './login/admin-login/admin-login.component';

@NgModule({
  declarations: [AdminLoginComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatButtonModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class AuthModule {}
