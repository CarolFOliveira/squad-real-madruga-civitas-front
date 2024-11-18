import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

interface IUserData {
  name: string;
  performance: string;
  link: string;
}

interface ICardData {
  icon: string;
  description: string;
  descriptionValue: number;
}

@Component({
  selector: 'app-teacher-home',
  templateUrl: './teacher-home.component.html',
  styleUrls: ['./teacher-home.component.scss'],
})
export class TeacherHomeComponent {
  public displayedColumns: string[] = ['name', 'performance', 'link'];
  public dataSource: MatTableDataSource<IUserData>;

  constructor() {
    this.dataSource = new MatTableDataSource(this.users);
  }

  // TODO: excluir exemplo
  options = [
    { value: 1, viewValue: '1' },
    { value: 2, viewValue: '2' },
    { value: 3, viewValue: '3' },
    { value: 4, viewValue: '4' },
  ];
  // TODO: excluir exemplo
  control = new FormControl('');

  // TODO: excluir dados de exemplo
  users: IUserData[] = [
    {
      name: 'Fulano',
      performance: 'bom',
      link: '123',
    },
    {
      name: 'Fulano 2',
      performance: 'normal',
      link: '123',
    },
    {
      name: 'Fulano 3',
      performance: 'ruim',
      link: '123',
    },
    {
      name: 'Fulano 4',
      performance: 'bom',
      link: '123',
    },
  ];

  public cards: ICardData[] = [
    {
      description: 'Número de Turmas',
      descriptionValue: 6,
      icon: 'school',
    },
    {
      description: 'Número de Alunos',
      descriptionValue: 104,
      icon: 'assignment_ind',
    },
    {
      description: 'Número de PDI',
      descriptionValue: 104,
      icon: 'assignment',
    },
  ];

  public getPerformance(value: string): string {
    const performance: { [key: string]: string } = {
      bom: 'good',
      normal: 'satisfactory',
      ruim: 'bad',
    };
    return performance[value];
  }
}
