//Libs
import { Component, Input } from '@angular/core';

// Interfaces
import { IStudentIDPSummary } from '../../interfaces/IStudentIDPSummary';

/**
 * StudentOverviewComponent
 *
 * Componente responsável por exibir informações básicas sobre o aluno, professor e o PDI.
 */
@Component({
  selector: 'app-student-overview',
  templateUrl: './student-overview.component.html',
  styleUrls: ['./student-overview.component.scss'],
})
export class StudentOverviewComponent {
  /**
   * Título da seção exibida no componente.
   */
  @Input() public title = '';

  /**
   * Informações do aluno que serão exibidas em tela.
   */
  @Input() public student!: IStudentIDPSummary;
}
