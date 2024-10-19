import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-image-action-panel',
  templateUrl: './image-action-panel.component.html',
  styleUrls: ['./image-action-panel.component.scss'],
})
export class ImageActionPanelComponent {
  @Input() imageUrl = '';
  @Input() imageDescription = '';
}
