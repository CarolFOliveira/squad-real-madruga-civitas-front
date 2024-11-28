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
    title: 'Civitas | Painel Administrador',
    children: [
      {
        path: 'cadastrar-aluno',
        component: StudentUpsertComponent,
        data: { breadcrumbs: 'Cadastrar Aluno' },
        title: 'Civitas | Cadastrar Aluno',
      },
      {
        path: 'editar-alunos/:id',
        component: StudentUpsertComponent,
        data: { breadcrumbs: 'Editar Aluno' },
        title: 'Civitas | Editar Aluno',
      },
      {
        path: 'alunos',
        component: StudentListComponent,
        data: { breadcrumbs: 'Alunos Cadastrados' },
        title: 'Civitas | Alunos',
      },
      {
        path: 'cadastrar-professor',
        component: TeacherUpsertComponent,
        data: { breadcrumbs: 'Cadastrar Professor' },
        title: 'Civitas | Cadastrar Professor',
      },
      {
        path: 'editar-professor/:id',
        component: TeacherUpsertComponent,
        data: { breadcrumbs: 'Editar Professor' },
        title: 'Civitas | Editar Professor',
      },
      {
        path: 'professores',
        component: TeacherListComponent,
        data: { breadcrumbs: 'Professores Cadastrados' },
        title: 'Civitas | Professores',
      },
      {
        path: 'cadastrar-turma',
        component: ClassroomUpsertComponent,
        data: { breadcrumbs: 'Cadastrar Turmas' },
        title: 'Civitas | Cadastrar Turmas',
      },
      {
        path: 'editar-turmas/:id',
        component: ClassroomUpsertComponent,
        data: { breadcrumbs: 'Editar Turma' },
        title: 'Civitas | Editar Turma',
      },
      {
        path: 'turmas',
        component: ClassroomListComponent,
        data: { breadcrumbs: 'Turmas Cadastradas' },
        title: 'Civitas | Turmas',
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
