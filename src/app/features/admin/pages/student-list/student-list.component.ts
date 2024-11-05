// Libs
import { Component } from '@angular/core';

// Interfaces
import { IPaginatedItems } from '../../interfaces/IPaginatedItems';
import { IStudent } from '../../interfaces/IStudent';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
})
export class StudentListComponent {
  public readonly endpoint = 'alunos';

  public mapStudentToPaginatedItems(student: IStudent): IPaginatedItems {
    return {
      id: student.id,
      title: student.name,
      subtitle: student.enrollmentNumber,
    };
  }
}
