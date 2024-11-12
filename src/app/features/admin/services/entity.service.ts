// Libs
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

// Interfaces
import { ISelectOptions } from 'src/app/shared/interfaces/ISelectOptions';
import { ApiEndpoints } from '../interfaces/ApiEndpoints';
import { IClassroom } from '../interfaces/IClassroom';
import { IEntityList } from '../interfaces/IEntityList';
import { IEntityResponse } from '../interfaces/IEntityResponse';

// Services
import { ToastService } from 'src/app/shared/services/toast.service';

// Environment Variables
import { environment } from 'src/environments/environment';

interface IEntityListParams {
  endpoint: string;
  page?: number;
  perPage?: number;
  searchTerm?: string;
}

interface IEntityRequestParams {
  endpoint: string;
  id: number;
}

interface IEntityUpsertParams<T> {
  endpoint: string;
  entity: T;
  id?: number;
}

interface IUpsertParams<T> {
  id: number | null;
  entity: T;
  endpoint: string;
  isEditMode: boolean;
}

/**
 * Serviço responsável por realizar operações CRUD com as entidades.
 */
@Injectable({
  providedIn: 'root',
})
export class EntityService {
  constructor(
    private _http: HttpClient,
    private _router: Router,
    private _toastService: ToastService
  ) {}

  /**
   * getEntities
   *
   * Busca uma lista de uma determinada entidade paginada no endpoint especificado.
   *
   * @typeParam T - Tipo da entidade.
   * @param params - Objeto do tipo {@link IEntityListParams}
   * @returns Um `Promise` com a lista de entidades paginadas.
   */
  public getEntities<T>({
    endpoint,
    page,
    perPage,
    searchTerm,
  }: IEntityListParams): Promise<IEntityList<T>> {
    return firstValueFrom(
      this._http.get<IEntityList<T>>(`${environment.apiUrl}/${endpoint}`, {
        params: {
          page: page?.toString() || '1',
          perPage: perPage?.toString() || '0',
          searchTerm: searchTerm || '',
        },
      })
    );
  }

  /**
   * register
   *
   * Registra uma nova entidade enviando suas informações para o backend via `POST`.
   *
   * @typeParam T - Tipo da entidade.
   * @param params - Parâmetros para criar a entidade, objeto do tipo {@link IEntityUpsertParams}
   * @returns Uma `Promise` com o objeto da resposta do tipo {@link IEntityResponse}
   */
  public register<T>({
    endpoint,
    entity,
  }: IEntityUpsertParams<T>): Promise<IEntityResponse> {
    return firstValueFrom(
      this._http.post<IEntityResponse>(
        `${environment.apiUrl}/${endpoint}`,
        entity
      )
    );
  }

  /**
   * update
   *
   * Atualiza uma entidade enviando suas informações para o backend via `PUT`.
   *
   * @typeParam T - Tipo da entidade.
   * @param params - Parâmetros para atualizar a entidade, objeto do tipo {@link IEntityUpsertParams}
   * @returns Uma `Promise` com o objeto da resposta do tipo {@link IEntityResponse}
   */
  public update<T>({
    endpoint,
    entity,
    id,
  }: IEntityUpsertParams<T>): Promise<IEntityResponse> {
    if (!Number.isInteger(id)) throw new Error('ID inválido');

    return firstValueFrom(
      this._http.put<IEntityResponse>(
        `${environment.apiUrl}/${endpoint}/${id}`,
        entity
      )
    );
  }

  /**
   * deleteEntity
   *
   * Exclui uma entidade com o ID especificado no endpoint fornecido.
   *
   * @param id - Um `number` que representa o ID da entidade a ser excluído.
   * @param endpoint - `string` que representa o endpoint onde a entidade será excluída.
   * @returns Uma `Promise` com o objeto da resposta do tipo {@link IEntityResponse}.
   */
  public deleteEntity(id: number, endpoint: string): Promise<IEntityResponse> {
    if (!Number.isInteger(id)) throw new Error('ID inválido');

    return firstValueFrom(
      this._http.delete<IEntityResponse>(
        `${environment.apiUrl}/${endpoint}/${id}`
      )
    );
  }

  /**
   * getEntity
   *
   * Busca uma determinada entidade pelo `id` no endpoint especificado.
   *
   * @typeParam T Tipo da entidade.
   * @param params - Parâmetros para buscar a entidade, objeto do tipo {@link IEntityRequestParams}
   * @returns Uma `Promise` com o objeto da resposta, tipado como `T` que corresponde à entidade.
   */
  public getEntity<T>({ endpoint, id }: IEntityRequestParams): Promise<T> {
    if (!Number.isInteger(id)) throw new Error('ID inválido');

    return firstValueFrom(
      this._http.get<T>(`${environment.apiUrl}/${endpoint}/${id}`)
    );
  }

  public async upsert<T>(upsertParams: IUpsertParams<T>): Promise<void> {
    try {
      let response;
      if (upsertParams.isEditMode && upsertParams.id)
        response = await this.update<T>({
          id: upsertParams.id,
          endpoint: upsertParams.endpoint,
          entity: upsertParams.entity,
        });
      else
        response = await this.register({
          endpoint: upsertParams.endpoint,
          entity: upsertParams.entity,
        });

      this._handleSuccess(response);
    } catch (error) {
      this._handleError(error as HttpErrorResponse);
    }
  }

  private _handleSuccess(response: IEntityResponse): void {
    this._toastService.success(response.message);
    this._router.navigate(['administrador']);
  }

  private _handleError(error: HttpErrorResponse): void {
    switch (error.status) {
      case 409:
        this._toastService.info(error.error.message);
        break;

      case 0 && error.error instanceof ProgressEvent:
        this._toastService.error('Não foi possível conectar ao servidor.');
        break;

      default:
        this._toastService.error(error.error.message);
    }
  }

  /**
   * getClasses
   *
   * Método responsável por buscar as turmas no serviço e alterar o formato para a lista de opções.
   *
   * @returns `Promise<void>` que é resolvida quando o processo de buscar as turmas é concluído.
   * @throws `Error` Se a resposta não for bem sucedida, um erro será lançado e um toast será exibido.
   */
  public async getClasses(): Promise<ISelectOptions[]> {
    try {
      const { data } = await this.getEntities<IClassroom>({
        endpoint: ApiEndpoints.CLASSROOMS,
      });
      if (!data.length) this._toastService.info('Nenhuma turma cadastrada.');

      return data.map((classroom: IClassroom) => ({
        value: classroom.id as number,
        viewValue: classroom.turmaApelido,
      }));
    } catch (error) {
      this._toastService.error(
        'Erro ao carregar as turmas. Atualize a página.'
      );
    }

    return [];
  }
}
