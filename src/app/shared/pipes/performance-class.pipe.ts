import { Pipe, PipeTransform } from '@angular/core';

/**
 * PerformanceClassPipe
 *
 * Pipe responsável por transformar o valor de desempenho de um aluno em uma classe CSS.
 *
 * @param value O valor do desempenho que será transformado em uma classe CSS.
 * @returns A classe CSS associada ao valor de desempenho fornecido.
 * @example
 * ```html
 * {{ 'engajado' | performanceClass }} // Resultado: 'reliable'
 * {{ 'exemplar' | performanceClass }} // Resultado: 'outstanding'
 * ```
 */
@Pipe({
  name: 'performanceClass',
})
export class PerformanceClassPipe implements PipeTransform {
  public transform(value: string): string {
    const performance: { [key: string]: string } = {
      exemplar: 'outstanding',
      engajado: 'reliable',
      evoluindo: 'developing',
      atenção: 'attention',
      crítico: 'critical',
    };

    return performance[value.toLowerCase()] || '';
  }
}
