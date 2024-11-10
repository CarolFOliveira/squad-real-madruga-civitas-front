// Libs
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { LayoutComponent } from './components/layout/layout.component';
import { ClassroomCreateComponent } from './pages/classroom-create/classroom-create.component';
import { ClassroomListComponent } from './pages/classroom-list/classroom-list.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { StudentCreateComponent } from './pages/student-create/student-create.component';
import { StudentListComponent } from './pages/student-list/student-list.component';
import { TeacherCreateComponent } from './pages/teacher-create/teacher-create.component';
import { TeacherListComponent } from './pages/teacher-list/teacher-list.component';

// Guards
import { adminGuard } from './guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [adminGuard],
    children: [
      {
        path: 'cadastrar-aluno',
        component: StudentCreateComponent,
        data: { breadcrumbs: 'Cadastrar Aluno' },
      },
      {
        path: 'alunos',
        component: StudentListComponent,
        data: { breadcrumbs: 'Alunos Cadastrados' },
      },
      {
        path: 'cadastrar-professor',
        component: TeacherCreateComponent,
        data: { breadcrumbs: 'Cadastrar Professor' },
      },
      {
        path: 'professores',
        component: TeacherListComponent,
        data: { breadcrumbs: 'Professores Cadastrados' },
      },
      {
        path: 'cadastrar-turma',
        component: ClassroomCreateComponent,
        data: { breadcrumbs: 'Cadastrar Turmas' },
      },
      {
        path: 'turmas',
        component: ClassroomListComponent,
        data: { breadcrumbs: 'Turmas Cadastradas' },
      },
      { path: '', component: DashboardComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
