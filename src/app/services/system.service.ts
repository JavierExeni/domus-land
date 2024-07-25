import { computed, inject, Injectable, signal } from '@angular/core';
import { System } from '../types';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '@envs/environment';

interface State {
  system: System | null;
  loading: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class SystemService {
  http = inject(HttpClient);

  baseUrl = `${environment.BASE_URL}parameter/`;

  #state = signal<State>({
    system: null,
    loading: false,
  });

  changeLoadingState(loading: boolean) {
    this.#state.set({
      system: this.system(),
      loading,
    });
  }

  changeSystemState(system: System) {
    this.#state.set({
      system,
      loading: this.isLoading(),
    });
  }

  // selectors
  public isLoading = computed<boolean>(() => this.#state().loading);
  public system = computed<System | null>(() => this.#state().system);

  loadSystemList() {
    this.changeLoadingState(true);
    this.getSystemList().subscribe();
  }

  getSystemList(): Observable<System[]> {
    const url = `${this.baseUrl}system/images/`;
    return this.http.get<System[]>(url).pipe(
      tap((systems) => {
        this.changeLoadingState(false);
        this.changeSystemState(systems[0]);
      })
    );
  }
}
