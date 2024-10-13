import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { InputComponent } from './components/input/input.component';

@NgModule({
  declarations: [InputComponent],
  imports: [CommonModule, MatIconModule, MatInputModule, ReactiveFormsModule],
  exports: [InputComponent],
})
export class SharedModule {}
