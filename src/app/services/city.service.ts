import { computed, inject, Injectable, signal } from '@angular/core';
import { City } from '../types';
import { HttpClient } from '@angular/common/http';
import { environment } from '@envs/environment';
import { Observable, tap } from 'rxjs';

interface State {
  cities: City[];
  loading: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class CityService {
  http = inject(HttpClient);
  // persistanceService = inject(PersistanceService);

  baseUrl = `${environment.BASE_URL}parameter/`;

  #state = signal<State>({
    cities: [],
    loading: false,
  });

  changeLoadingState(loading: boolean) {
    this.#state.set({
      cities: this.cities(),
      loading,
    });
  }

  changeCitiesState(cities: City[]) {
    this.#state.set({
      cities,
      loading: this.isLoading(),
    });
  }

  // selectors
  public isLoading = computed<boolean>(() => this.#state().loading);
  public cities = computed<City[]>(() => this.#state().cities);

  constructor() {
    this.loadCityList();
  }

  loadCityList() {
    this.changeLoadingState(true);
    this.getCityList().subscribe();
  }

  getCityList(): Observable<City[]> {
    const url = `${this.baseUrl}city/cities/`;
    return this.http.get<City[]>(url).pipe(
      tap((cities) => {
        this.changeLoadingState(false);
        this.changeCitiesState(cities);
      })
    );
  }
}
