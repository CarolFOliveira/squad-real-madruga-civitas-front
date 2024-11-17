// Libs
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// App Modules
import { TeacherRoutingModule } from './teacher-routing.module';

const MODULES = [CommonModule, TeacherRoutingModule];

@NgModule({
  declarations: [],
  providers: [],
  imports: [...MODULES],
})
export class TeacherModule {}
