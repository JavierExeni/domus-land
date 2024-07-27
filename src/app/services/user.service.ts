import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Employee, PaginatedResponse, USER_TYPE } from '../types';
import { environment } from '@envs/environment';
import { Observable, tap } from 'rxjs';

interface State {
  public_agents: PaginatedResponse<Employee>;
  agents: Employee[];
  loading: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  http = inject(HttpClient);

  baseUrl = `${environment.BASE_URL}auth/`;

  initialValue: PaginatedResponse<Employee> = {
    count: 0,
    next: null,
    previous: null,
    results: [],
  };

  #state = signal<State>({
    public_agents: this.initialValue,
    agents: [],
    loading: false,
  });

  changeLoadingState(loading: boolean) {
    this.#state.update((oldValue) => ({
      ...oldValue,
      loading,
    }));
  }

  changeAgentsState(agents: Employee[]) {
    this.#state.update((oldValue) => ({
      ...oldValue,
      agents,
    }));
  }

  changePublicAgentsState(public_agents: PaginatedResponse<Employee>) {
    this.#state.update((oldValue) => ({
      ...oldValue,
      public_agents,
    }));
  }

  // Selectors
  public isLoading = computed<boolean>(() => this.#state().loading);
  public agents = computed<Employee[]>(() => this.#state().agents);
  public public_agents = computed<PaginatedResponse<Employee>>(
    () => this.#state().public_agents
  );

  loadPublicEmployeeByRoleList(
    role: USER_TYPE,
    full_name: string = '',
    page: number = 1
  ) {
    this.changeLoadingState(true);
    this.getPublicEmployeeByRoleList(role, full_name, null, page).subscribe();
  }

  loadAllPublicEmployeeList() {
    this.changeLoadingState(true);
    this.getAllPublicEmployees().subscribe();
  }

  loadAgentsList() {
    this.changeLoadingState(true);
    this.getEmployeeList().subscribe();
  }

  loadAgentByRoleList(role: USER_TYPE) {
    this.changeLoadingState(true);
    this.getEmployeeByRoleList(role).subscribe();
  }

  getEmployeeList(): Observable<Employee[]> {
    const url = `${this.baseUrl}user/employees/`;
    return this.http.get<Employee[]>(url).pipe(
      tap((agents) => {
        this.changeAgentsState(agents);
        this.changeLoadingState(false);
      })
    );
  }

  getEmployeeByRoleList(role: USER_TYPE): Observable<Employee[]> {
    const url = `${this.baseUrl}user/${role}/role/`;
    return this.http.get<Employee[]>(url).pipe(
      tap((agents) => {
        this.changeAgentsState(agents);
        this.changeLoadingState(false);
      })
    );
  }

  getPublicEmployeeByRoleList(
    role: USER_TYPE,
    full_name: string = '',
    city_id: number | null = null,
    page: number = 1
  ): Observable<PaginatedResponse<Employee>> {
    const url = `${this.baseUrl}user/public-agents/?page=${page}`;
    return this.http
      .post<PaginatedResponse<Employee>>(url, { role, city_id, full_name })
      .pipe(
        tap((agents) => {
          this.changePublicAgentsState(agents);
          this.changeLoadingState(false);
        })
      );
  }

  getAllPublicEmployees(): Observable<Employee[]> {
    const url = `${this.baseUrl}user/public-employees/`;
    return this.http.get<Employee[]>(url).pipe(
      tap((agents) => {
        this.changeAgentsState(agents);
        this.changeLoadingState(false);
      })
    );
  }

  getSingleEmployee(id: number): Observable<Employee> {
    const url = `${this.baseUrl}user/${id}/`;
    return this.http.get<Employee>(url);
  }
}
