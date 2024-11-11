// Libs
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

// Interfaces
import { IEntityList } from '../interfaces/IEntityList';
import { IEntityResponse } from '../interfaces/IEntityResponse';

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

/**
 * Serviço responsável por realizar operações CRUD com as entidades.
 */
@Injectable({
  providedIn: 'root',
})
export class EntityService {
  constructor(private _http: HttpClient) {}

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
}
