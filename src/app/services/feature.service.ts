import { computed, inject, Injectable, signal } from '@angular/core';
import { Feature } from '../types';
import { HttpClient } from '@angular/common/http';
import { environment } from '@envs/environment';
import { Observable, tap } from 'rxjs';

interface State {
  features: Feature[];
  loading: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class FeatureService {
  http = inject(HttpClient);

  baseUrl = `${environment.BASE_URL}parameter/`;

  #state = signal<State>({
    features: [],
    loading: false,
  });

  changeLoadingState(loading: boolean) {
    this.#state.set({
      features: this.features(),
      loading,
    });
  }

  changeFeaturesState(features: Feature[]) {
    this.#state.set({
      features,
      loading: this.isLoading(),
    });
  }

  // selectors
  public isLoading = computed<boolean>(() => this.#state().loading);
  public features = computed<Feature[]>(() => this.#state().features);

  constructor() {
    this.loadFeatureList();
  }

  loadFeatureList() {
    this.changeLoadingState(true);
    this.getFeatureList().subscribe();
  }

  getFeatureList(): Observable<Feature[]> {
    const url = `${this.baseUrl}feature/features/`;
    return this.http.get<Feature[]>(url).pipe(
      tap((features) => {
        this.changeLoadingState(false);
        this.changeFeaturesState(features);
      })
    );
  }
}
