// Libs
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

// Angular Material Modules
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// Components
import { ButtonComponent } from './components/button/button.component';
import { ImageActionPanelComponent } from './components/image-action-panel/image-action-panel.component';
import { InputComponent } from './components/input/input.component';

const COMPONENTS = [ButtonComponent, ImageActionPanelComponent, InputComponent];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    RouterLink,
  ],
  exports: [...COMPONENTS],
})
export class SharedModule {}
