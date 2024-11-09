import { Injectable } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';

enum ToastType {
  SUCCESS = 'success',
  ERROR = 'error',
  INFO = 'info',
}

interface IShowToast {
  message: string;
  type: ToastType;
  props?: {
    autoClose: boolean;
    dismissible: boolean;
  };
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private readonly colors = {
    success: '#65558f',
    error: '#d63a32',
    info: '#528bf5',
    secondary: '#FFFAEE',
  };

  constructor(private _toast: HotToastService) {}

  public success(message: string): void {
    this.showToast({ message, type: ToastType.SUCCESS });
  }

  public error(message: string): void {
    this.showToast({
      message,
      type: ToastType.ERROR,
      props: { autoClose: false, dismissible: true },
    });
  }

  public info(message: string): void {
    this.showToast({
      message,
      type: ToastType.INFO,
      props: { autoClose: false, dismissible: true },
    });
  }

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
