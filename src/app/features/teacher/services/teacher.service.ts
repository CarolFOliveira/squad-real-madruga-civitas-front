// Libs
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

// Services
import { ToastService } from 'src/app/shared/services/toast.service';

// Interfaces
import { ISelectOptions } from 'src/app/shared/interfaces/ISelectOptions';

// Variable Environment
import { environment } from 'src/environments/environment';

/**
 * TeacherService
 *
 * Serviço para gerenciamento de operações relacionadas a professores.
 */
@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  constructor(private _http: HttpClient, private _toastService: ToastService) {}

  /**
   * getTeacherClassrooms
   *
   * Responsável por buscar a lista de turmas associadas aos professores no backend.
   *
   * @returns Um `Promise` contendo uma lista de opções para seleção do tipo {@link ISelectOptions}.
   * @remarks
   * Transforma os dados para serem utilizados em componentes de seleção
   */
  public async getTeacherClassrooms(): Promise<ISelectOptions[]> {
    try {
      const response = await firstValueFrom(
        this._http.get<{ id: number; turmaApelido: string }[]>(
          `${environment.apiUrl}/turmas`
        )
      );

      return response.map((classroom) => ({
        value: classroom.id,
        viewValue: classroom.turmaApelido,
      }));
    } catch (error) {
      this._toastService.error('Erro ao carregar as turmas');
    }

    return [];
  }
}
