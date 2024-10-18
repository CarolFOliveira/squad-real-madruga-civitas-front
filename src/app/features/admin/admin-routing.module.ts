// Libs
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { StudentRegistrationComponent } from './pages/student-registration/student-registration.component';

const routes: Routes = [
  { path: 'registrar/aluno', component: StudentRegistrationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
