import { computed, inject, Injectable, signal } from '@angular/core';
import { Contact, ContactRequest, PaginatedResponse } from '../types';
import { HttpClient } from '@angular/common/http';
import { environment } from '@envs/environment';
import { Observable, tap } from 'rxjs';

interface State {
  contacts: PaginatedResponse<Contact>;
  loading: boolean;
}
@Injectable({
  providedIn: 'root',
})
export class ContactService {
  http = inject(HttpClient);
  // persistanceService = inject(PersistanceService);

  baseUrl = `${environment.BASE_URL}parameter/`;

  initialValue: PaginatedResponse<Contact> = {
    count: 0,
    next: null,
    previous: null,
    results: [],
  };

  #state = signal<State>({
    contacts: this.initialValue,
    loading: false,
  });

  constructor() {}

  changeLoadingState(loading: boolean) {
    this.#state.set({
      contacts: this.contacts(),
      loading,
    });
  }

  changeContactsState(contacts: PaginatedResponse<Contact>) {
    this.#state.set({
      contacts,
      loading: this.isLoading(),
    });
  }

  public isLoading = computed<boolean>(() => this.#state().loading);
  public contacts = computed<PaginatedResponse<Contact>>(
    () => this.#state().contacts
  );

  loadFilteredContacts(
    state: number,
    type: number,
    page: number = 1,
    agent_id: number | null = null
  ) {
    this.changeLoadingState(true);
    this.getFilterPaginatedContacts(page, state, type, agent_id).subscribe();
  }

  getFilterPaginatedContacts(
    page: number,
    state: number,
    type: number,
    agent_id: number | null = null
  ): Observable<PaginatedResponse<Contact>> {
    const url = `${this.baseUrl}contact/contact-filter/?page=${page}`;
    return this.http
      .post<PaginatedResponse<Contact>>(url, { state, type, agent_id })
      .pipe(
        tap((response) => {
          this.changeContactsState(response);
          this.changeLoadingState(false);
        })
      );
  }

  createContact(request: ContactRequest) {
    const url = `${this.baseUrl}contact/`;
    return this.http.post<Contact>(url, request);
  }

  markAsRead(id: number) {
    const url = `${this.baseUrl}contact/${id}/mark-read/`;
    return this.http.post<Contact>(url, {});
  }
}
