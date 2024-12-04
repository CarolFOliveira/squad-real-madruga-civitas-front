// Libs
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { TeacherLayoutComponent } from './components/teacher-layout/teacher-layout.component';
import { StudentIdpChartComponent } from './pages/student-idp-chart/student-idp-chart.component';
import { StudentIdpDetailsComponent } from './pages/student-idp-details/student-idp-details.component';
import { TeacherHomeComponent } from './pages/teacher-home/teacher-home.component';

const routes: Routes = [
  {
    path: '',
    component: TeacherLayoutComponent,
    children: [
      { path: '', component: TeacherHomeComponent },
      {
        path: 'aluno-pdi/:id',
        component: StudentIdpChartComponent,
      },
      {
        path: 'aluno-pdi/:studentId/detalhes/:idpId',
        component: StudentIdpDetailsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TeacherRoutingModule {}
