// Libs
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

// Angular Material Modules
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';

// Components
import { ButtonComponent } from './components/button/button.component';
import { CardComponent } from './components/card/card.component';
import { ImageActionPanelComponent } from './components/image-action-panel/image-action-panel.component';
import { InputComponent } from './components/input/input.component';
import { ReturnButtonComponent } from './components/return-button/return-button.component';
import { SelectComponent } from './components/select/select.component';

const COMPONENTS = [
  ButtonComponent,
  CardComponent,
  ImageActionPanelComponent,
  InputComponent,
  ReturnButtonComponent,
  SelectComponent,
];

const MODULES = [
  CommonModule,
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  ReactiveFormsModule,
];

@NgModule({
  declarations: [...COMPONENTS],
  providers: [provideNgxMask()],
  imports: [...MODULES, NgxMaskDirective, NgxMaskPipe, RouterLink],
  exports: [...COMPONENTS],
})
export class SharedModule {}
