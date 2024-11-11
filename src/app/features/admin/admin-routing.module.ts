// Libs
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { LayoutComponent } from './components/layout/layout.component';
import { ClassroomListComponent } from './pages/classroom-list/classroom-list.component';
import { ClassroomUpsertComponent } from './pages/classroom-upsert/classroom-upsert.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { StudentListComponent } from './pages/student-list/student-list.component';
import { StudentUpsertComponent } from './pages/student-upsert/student-upsert.component';
import { TeacherListComponent } from './pages/teacher-list/teacher-list.component';
import { TeacherUpsertComponent } from './pages/teacher-upsert/teacher-upsert.component';

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
        component: StudentUpsertComponent,
        data: { breadcrumbs: 'Cadastrar Aluno' },
      },
      {
        path: 'editar-alunos/:id',
        component: StudentUpsertComponent,
        data: { breadcrumbs: 'Editar Aluno' },
      },
      {
        path: 'alunos',
        component: StudentListComponent,
        data: { breadcrumbs: 'Alunos Cadastrados' },
      },
      {
        path: 'cadastrar-professor',
        component: TeacherUpsertComponent,
        data: { breadcrumbs: 'Cadastrar Professor' },
      },
      {
        path: 'editar-professor/:id',
        component: TeacherUpsertComponent,
        data: { breadcrumbs: 'Editar Professor' },
      },
      {
        path: 'professores',
        component: TeacherListComponent,
        data: { breadcrumbs: 'Professores Cadastrados' },
      },
      {
        path: 'cadastrar-turma',
        component: ClassroomUpsertComponent,
        data: { breadcrumbs: 'Cadastrar Turmas' },
      },
      {
        path: 'editar-turma/:id',
        component: TeacherUpsertComponent,
        data: { breadcrumbs: 'Editar Turma' },
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
