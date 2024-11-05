// Libs
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

// Interfaces
import { IEntityList } from '../interfaces/IEntityList';

// Environment Variables
import { environment } from 'src/environments/environment';

interface IEntityListParams {
  endpoint: string;
  page: number;
}

@Injectable({
  providedIn: 'root',
})
export class EntityService {
  constructor(private _http: HttpClient) {}

  public async getEntities<T>({
    endpoint,
    page,
  }: IEntityListParams): Promise<IEntityList<T>> {
    return await firstValueFrom(
      this._http.get<IEntityList<T>>(`${environment.apiUrl}/${endpoint}`, {
        params: {
          pagina: page.toString(),
        },
      })
    );
  }

  public async deleteEntity(id: number, endpoint: string): Promise<void> {
    await firstValueFrom(
      this._http.delete(`${environment.apiUrl}/${endpoint}/${id}`)
    );
  }
}
