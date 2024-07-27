import { Injectable } from '@angular/core';

import { SweetAlertIcon } from 'sweetalert2';
import Swal from 'sweetalert2';

import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  public loaderOpen$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    true
  );

  get loaderOpen(): Observable<boolean> {
    return this.loaderOpen$.asObservable();
  }

  alertNotification(icon: SweetAlertIcon, title: string, text: string) {
    Swal.fire({
      icon,
      title,
      text,
      showConfirmButton: false,
    });
  }

  alertNotificationClose(icon: SweetAlertIcon, title: string, text: string) {
    Swal.fire({
      icon,
      title,
      text,
      showCancelButton: true,
      showConfirmButton: false,
    });
  }

  alertConfirmation(
    title: string,
    text: string,
    confirmButtonText: string
  ): Promise<any> {
    return Swal.fire({
      title,
      text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText,
      cancelButtonText: 'Cancelar'
    });
  }

  loader(title: string = 'Cargando...') {
    Swal.fire({
      title,
      heightAuto: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: async () => {
        Swal.showLoading();
        this.loaderOpen.subscribe({
          next: (flag) => {
            if (!flag) {
              Swal.close();
            }
          },
        });
      },
    });
  }

  loaderClose() {
    this.loaderOpen$.next(false);
  }
}
