import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

/**
 * SearchbarComponent
 *
 * Barra de pesquisa para o usuário buscar algum item, será adicionado `searchTerm` nos query params na url.
 *
 * @example
 * ```html
 * <app-searchbar" />
 * ```
 */
@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss'],
})
export class SearchbarComponent implements OnInit, OnDestroy {
  constructor(private _router: Router) {}

  /**
   * Evento que é emitido quando uma pesquisa é realizada, enviando o termo de pesquisa atual.
   */
  private _searchTermSubject$ = new Subject<string>();

  /**
   * O termo de pesquisa inserido pelo usuário na barra de pesquisa.
   */
  public searchTerm = '';

  /**
   * Controla a visibilidade da barra de pesquisa no mobile.
   *
   * @defaultValue `false`
   */
  public isVisible = false;

  /**
   * ngOnInit
   *
   * Inicializa o componente se inscrevendo no `Subject` para monitorar mudanças no `searchTerm` e
   * atualiza as query params da url com o termo de pesquisa atualizado.
   *
   * @remarks
   * Foi utilizado debounce para que o termo de pesquisa atualize as query params depois de meio segundo.
   * A atualização das query params só acontece quando o valor for distinto do último enviado.
   */
  public ngOnInit(): void {
    this._searchTermSubject$
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((searchTerm: string) => {
        this._router.navigate([], {
          queryParams: { page: 1, searchTerm },
          queryParamsHandling: 'merge',
        });
      });
  }

  /**
   * openSearchbar
   *
   * Abre a barra de pesquisa definindo a flag isVisible como `true`.
   *
   * @remarks
   * Alterando toggleSearch para `true`, faz com que a barra de pesquisa ocupe todo o espaço disponível em tela (no modo mobile).
   */
  public openSearchbar(): void {
    this.isVisible = true;
  }

  /**
   * closeSearchbar
   *
   * Fecha a barra de pesquisa definindo a flag isVisible como `false`.
   */
  public closeSearchbar(): void {
    this.isVisible = false;
  }

  /**
   * clearSearch
   *
   * Limpa o termo de pesquisa e emite um valor vazio no Subject.
   */
  public clearSearch() {
    this.searchTerm = '';
    this._searchTermSubject$.next('');
  }

  /**
   * handleSearch
   *
   * Atualiza o termo de pesquisa com o valor informado e o envia ao Subject.
   *
   * @param value - `string` com o termo de pesquisa a ser enviado para o backend.
   */
  public handleSearch(value: string) {
    this._searchTermSubject$.next(value);
  }

  /**
   * ngOnDestroy
   *
   * Limpa a inscrição para evitar vazamentos de memória quando o componente for destruído.
   */
  public ngOnDestroy(): void {
    this._searchTermSubject$.unsubscribe();
  }
}
