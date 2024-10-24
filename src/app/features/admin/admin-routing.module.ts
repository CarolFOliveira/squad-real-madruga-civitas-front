// Libs
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { LayoutComponent } from './components/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { StudentRegistrationComponent } from './pages/student-registration/student-registration.component';

const routes: Routes = [
  { path: 'registrar/aluno', component: StudentRegistrationComponent },
  {
    path: '',
    component: LayoutComponent,
    children: [{ path: '', component: DashboardComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
