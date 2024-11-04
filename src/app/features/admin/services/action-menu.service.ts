import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ActionMenuService {
  private editEvent = new Subject<number>();
  private deleteEvent = new Subject<number>();

  public editEvent$ = this.editEvent.asObservable();
  public deleteEvent$ = this.deleteEvent.asObservable();

  emitEdit(id: number) {
    this.editEvent.next(id);
  }

  emitDelete(id: number) {
    this.deleteEvent.next(id);
  }
}
