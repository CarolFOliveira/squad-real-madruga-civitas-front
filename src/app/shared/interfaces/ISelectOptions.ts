/**
 * ISelectOptions
 *
 * Representa uma opção que será mostrada em um select do angular material.
 */
export interface ISelectOptions {
  /**
   * O texto ou número que será enviado para o backend, na maioria dos casos o id.
   */
  value: number | string;

  /**
   * O texto que será exibido para o usuário no select para ele selecionar a opção.
   */
  viewValue: string;
}
