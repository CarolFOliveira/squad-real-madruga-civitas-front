// Libs
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

// Services
import { ToastService } from 'src/app/shared/services/toast.service';

// Interfaces
import { ISelectOptions } from 'src/app/shared/interfaces/ISelectOptions';
import { IStudentIdpDetails } from '../interfaces/IStudentIdpDetails';
import { IStudentIdpHistory } from '../interfaces/IStudentIdpHistory';
import { IStudentIdpSummary } from '../interfaces/IStudentIdpSummary';
import { IStudentTableData } from '../interfaces/IStudentTableData';

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
export class TeacherAPIService {
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

  /**
   * getStudentsFromClassroom
   *
   * Responsável por buscar a lista de alunos associadas a turma no backend.
   *
   * @returns Um `Promise` contendo uma lista de alunos do tipo {@link IStudentTableData}.
   */
  public async getStudentsFromClassroom(): Promise<IStudentTableData[]> {
    try {
      const response = await firstValueFrom(
        this._http.get<IStudentTableData[]>(`${environment.apiUrl}/alunos`)
      );

      return response.map((student) => ({
        id: student.id,
        name: student.name,
        performance: student.performance,
      }));
    } catch (error) {
      this._toastService.error('Erro ao carregar as turmas');
    }

    return [];
  }

  /**
   * getStudentIdp
   *
   * Responsável por buscar os detalhes do PDI de um aluno específico.
   *
   * @param id O ID para buscar os detalhes relacionados ao PDI do aluno.
   * @returns Uma Promise que é resolvida com um objeto do tipo {@link IStudentPdiDetails}
   */
  public getStudentIdp(id: number | null): Promise<IStudentIdpDetails> {
    return firstValueFrom(
      this._http.get<IStudentIdpDetails>(
        `${environment.apiUrl}/pdi/alunos/${id}/detalhes`
      )
    );
  }

  /**
   * getStudentData
   *
   * Responsável por buscar os dados de um aluno pelo ID.
   *
   * @param studentId O ID O ID do aluno para buscar os dados.
   * @returns Uma Promise que é resolvida com um objeto do tipo {@link IStudentIdpSummary}
   */
  public getStudentData(studentId: number): Promise<IStudentIdpSummary> {
    return firstValueFrom(
      this._http.get<IStudentIdpSummary>(
        `${environment.apiUrl}/pdi/alunos/${studentId}/dados`
      )
    );
  }

  /**
   * getStudentIdpHistory
   *
   * Responsável por realizar a busca de todos os registros de PDI de um aluno.
   *
   * @param studentId O ID do aluno, utilizado para buscar o histórico de PDI.
   * @returns Uma Promise que é resolvida com uma lista de objetos do tipo {@link IStudentIdpHistory}
   */
  public getStudentIdpHistory(
    studentId: number
  ): Promise<IStudentIdpHistory[]> {
    return firstValueFrom(
      this._http.get<IStudentIdpHistory[]>(
        `${environment.apiUrl}/pdi/alunos/${studentId}/registros`
      )
    );
  }
}
