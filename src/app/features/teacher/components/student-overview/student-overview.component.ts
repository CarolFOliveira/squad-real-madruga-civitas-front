import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-student-overview',
  templateUrl: './student-overview.component.html',
  styleUrls: ['./student-overview.component.scss'],
})
export class StudentOverviewComponent {
  @Input() public title = '';
}
