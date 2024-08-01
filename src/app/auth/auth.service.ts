import {
  computed,
  inject,
  Injectable,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { BehaviorSubject, concatMap, map, Observable, tap } from 'rxjs';

import { UserService } from '@services/user.service';
import { environment } from '@envs/environment';
import { PersistanceService } from '@services/persistance.service';

import {
  AuthDecoded,
  AuthResponse,
  CurrentUser,
  LoginRequest,
} from '../types/auth.type';
import { Employee, USER_TYPE } from '../types';

import { jwtDecode } from 'jwt-decode';
import { isPlatformBrowser } from '@angular/common';

interface State {
  user: CurrentUser | null;
  role: USER_TYPE | null;
  loading: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);
  private persistanceService = inject(PersistanceService);

  private readonly baseUrl = `${environment.BASE_URL}`;

  #state = signal<State>({
    user: null,
    role: null,
    loading: false,
  });

  changeUserState(user: CurrentUser | null) {
    this.#state.update((oldValue) => ({
      ...oldValue,
      user,
    }));
  }

  changeRoleState(role: USER_TYPE | null) {
    this.#state.update((oldValue) => ({
      ...oldValue,
      role,
    }));
  }

  changeLoadingState(loading: boolean) {
    this.#state.update((oldValue) => ({
      ...oldValue,
      loading,
    }));
  }

  isLoggedInBh: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    this.hasToken()
  );

  get isLoggedInSubject() {
    return this.isLoggedInBh.asObservable();
  }

  /**
   * if we have token the user is loggedIn
   * @returns {boolean}
   */
  private hasToken(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!this.persistanceService.get('accessToken');
    }
    return false;
  }

  public isLoading = computed<boolean>(() => this.#state().loading);
  public user = computed<CurrentUser | null>(() => this.#state().user);
  public role = computed<USER_TYPE | null>(() => {
    if (isPlatformBrowser(this.platformId)) {
      return this.isLoggedIn() && this.#state().role
        ? this.#state().role
        : this.persistanceService.get('currentRole');
    }
    return null;
  });

  public isLoggedIn = computed<boolean>(() => {
    if (isPlatformBrowser(this.platformId)) {
      return this.persistanceService.get('accessToken') ? true : false;
    }
    return false;
  });

  public currentLoggedUser = computed<Employee>(() => {
    if (isPlatformBrowser(this.platformId)) {
      return this.isLoggedIn() && this.user()
        ? this.user()
        : this.persistanceService.get('currentUser');
    }
  });

  login(data: LoginRequest): Observable<CurrentUser> {
    const url = `${this.baseUrl}token/`;
    this.changeLoadingState(true);
    return this.http.post<AuthResponse>(url, data).pipe(
      concatMap(({ access }) => {
        const decoded: AuthDecoded = jwtDecode(access);
        this.changeRoleState(decoded.roles[0]);
        this.persistanceService.set('accessToken', access);
        this.persistanceService.set('currentRole', decoded.roles[0]);
        return this.getCurrentUser();
      }),
      tap((user) => {
        this.changeLoadingState(false);
        this.isLoggedInBh.next(true);
        this.persistanceService.set('currentUser', user);
        this.changeUserState(user);
      })
    );
  }

  getCurrentUser(): Observable<CurrentUser> {
    const url = `${this.baseUrl}auth/user/current-user/`;
    return this.http.get<Employee>(url).pipe(
      map((res: Employee) => {
        const currentUser: CurrentUser = {
          id: res.id,
          email: res.email,
          full_name: `${res.first_name} ${res.last_name}`,
          image_profile: res.image_profile,
          role: res.groups[0],
        };
        return currentUser;
      })
    );
  }

  logout() {
    localStorage.clear();
    this.changeUserState(null);
    this.isLoggedInBh.next(false);
    this.router.navigate(['/']);
  }
}
