import { Injectable } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';

/**
 * Enum representando os diferentes tipos de notificações toast.
 */
enum ToastType {
  SUCCESS = 'success',
  ERROR = 'error',
  INFO = 'info',
}

/**
 * Interface para configurar as opções de exibição do toast.
 */
interface IShowToast {
  message: string;
  type: ToastType;
  props?: {
    autoClose: boolean;
    dismissible: boolean;
  };
}

/**
 * ToastService
 *
 * Serviço responsável por mostrar a notificação de Sucesso, erro ou de informação na tela.
 */
@Injectable({
  providedIn: 'root',
})
export class ToastService {
  /**
   * Cores para cada tipo de toast.
   */
  private readonly colors = {
    success: '#65558f',
    error: '#d63a32',
    info: '#528bf5',
    secondary: '#FFFAEE',
  };

  constructor(private _toast: HotToastService) {}

  /**
   * success
   *
   * Exibe um toast de sucesso.
   *
   * @param message `string` que representa a mensagem a ser exibida na tela
   *  @remarks
   * Esse botão fecha sozinho após 3 segundos.
   */
  public success(message: string): void {
    this.showToast({ message, type: ToastType.SUCCESS });
  }

  /**
   * error
   *
   * Exibe um toast de erro.
   *
   * @param message `string` que representa a mensagem a ser exibida na tela
   * @remarks
   * Esse botão não fecha sozinho, depende de uma ação do usuário para ser fechado.
   */
  public error(message: string): void {
    this.showToast({
      message,
      type: ToastType.ERROR,
      props: { autoClose: false, dismissible: true },
    });
  }

  /**
   * info
   *
   * Exibe um toast de informação.
   *
   * @param message `string` que representa a mensagem a ser exibida na tela.
   * @remarks
   * Esse botão não fecha sozinho, depende de uma ação do usuário para ser fechado.
   */
  public info(message: string): void {
    this.showToast({
      message,
      type: ToastType.INFO,
      props: { autoClose: false, dismissible: true },
    });
  }

  /**
   * showToast
   *
   * Configura e exibe o toast com as opções especificadas.
   *
   * @param IShowToast - Objeto contendo a mensagem, tipo e propriedades adicionais {@link IShowToast}
   */
  private showToast({ message, type, props }: IShowToast): void {
    const color = this.colors[type];

    this._toast[type](message, {
      autoClose: true,
      closeStyle: {
        'margin-top': 0,
        'align-self': 'center',
        cursor: 'pointer',
      },
      iconTheme: {
        primary: color,
        secondary: this.colors.secondary,
      },
      style: {
        border: `1px solid ${color}`,
        color,
        padding: '16px',
      },
      ...props,
    });
  }
}
