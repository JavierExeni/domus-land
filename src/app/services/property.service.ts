import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { environment } from '@envs/environment';
import { PaginatedResponse, Property, PropertyFilter, PropertyRequest } from '../types';
import { Observable, tap } from 'rxjs';

interface State {
  public_properties: PaginatedResponse<Property>;
  properties_by_agent: PaginatedResponse<Property>;
  filter_general_property: PropertyFilter | null;
  filter_agents_property: PropertyFilter | null;
  loading: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  http = inject(HttpClient);
  fb = inject(FormBuilder);

  formFilter: FormGroup = this.fb.group({
    property_code: [''],
    city: [''],
    zones: [''],
    property_type: [''],
    property_category: [''],
    features: [''],
    price_min: [0],
    price_max: [0],
    area_max: [0],
    area_min: [0],
    bedrooms: [0],
    bathrooms: [0],
    num_parking: [0],
    agent: [''],
  });

  baseUrl = `${environment.BASE_URL}properties/`;

  initialValue: PaginatedResponse<Property> = {
    count: 0,
    next: null,
    previous: null,
    results: [],
  };

  #state = signal<State>({
    public_properties: this.initialValue,
    properties_by_agent: this.initialValue,
    filter_general_property: null,
    filter_agents_property: null,
    loading: false,
  });

  changeLoadingState(loading: boolean) {
    this.#state.update((oldValue) => ({
      ...oldValue,
      loading,
    }));
  }

  changePublicPropertiesState(public_properties: PaginatedResponse<Property>) {
    this.#state.update((oldValue) => ({
      ...oldValue,
      public_properties,
    }));
  }

  changePropertiesByAgentState(
    properties_by_agent: PaginatedResponse<Property>
  ) {
    this.#state.update((oldValue) => ({
      ...oldValue,
      properties_by_agent,
    }));
  }

  changeGeneralFilterState(filter: PropertyFilter | null) {
    this.#state.update((oldValue) => ({
      ...oldValue,
      filter_general_property: filter
        ? { ...oldValue.filter_general_property, ...filter }
        : null,
    }));
  }

  changeAgentsFilterState(filter: PropertyFilter | null) {
    this.#state.update((oldValue) => ({
      ...oldValue,
      filter_agents_property: filter,
    }));
  }

  // Selectors

  public isLoading = computed<boolean>(() => this.#state().loading);
  public public_properties = computed<PaginatedResponse<Property>>(
    () => this.#state().public_properties
  );
  public properties_by_agent = computed<PaginatedResponse<Property>>(
    () => this.#state().properties_by_agent
  );

  public filter_general_property = computed<PropertyFilter | null>(
    () => this.#state().filter_general_property
  );

  public filter_agents_property = computed<PropertyFilter | null>(
    () => this.#state().filter_agents_property
  );

  loadPublicPagiantedPropertyList(page: number = 1) {
    this.changeLoadingState(true);
    this.getPublicPaginatedPropertyList(page).subscribe();
  }

  getPaginatedPropertyList(): Observable<PaginatedResponse<Property>> {
    const url = `${this.baseUrl}property/`;
    return this.http.get<PaginatedResponse<Property>>(url).pipe(
      tap((properties) => {
        this.changePublicPropertiesState(properties);
        this.changeLoadingState(false);
      })
    );
  }

  getPublicPaginatedPropertyList(
    page: number = 1
  ): Observable<PaginatedResponse<Property>> {
    const url = `${this.baseUrl}property/public-filter/?page=${page}`;
    return this.http.get<PaginatedResponse<Property>>(url).pipe(
      tap((properties) => {
        this.changePublicPropertiesState(properties);
        this.changeLoadingState(false);
      })
    );
  }

  filteredProperties(
    body: PropertyFilter | null,
    page: number | null = 1
  ): Observable<PaginatedResponse<Property>> {
    this.changeLoadingState(true);
    const url = `${this.baseUrl}property/filter-properties/${
      page ? `?page=${page}` : ''
    }`;
    return this.http.post<PaginatedResponse<Property>>(url, body).pipe(
      tap((properties) => {
        this.changePublicPropertiesState(properties);
        this.changeLoadingState(false);
      })
    );
  }

  getPropertyListyAgent(
    id: number,
    page: number = 1
  ): Observable<PaginatedResponse<Property>> {
    const url = `${this.baseUrl}property/${id}/agent/?page=${page}`;
    return this.http.get<PaginatedResponse<Property>>(url).pipe(
      tap((properties) => {
        this.changePropertiesByAgentState(properties);
        this.changeLoadingState(false);
      })
    );
  }

  getSingleProperty(id: number): Observable<Property> {
    const url = `${this.baseUrl}property/${id}/`;
    return this.http.get<Property>(url);
  }

  updateProperty(id: number, property: Partial<PropertyRequest>) {
    const url = `${this.baseUrl}property/${id}/`;
    return this.http.patch<Property>(url, property);
  }
}
