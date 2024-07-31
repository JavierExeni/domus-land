import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { inject } from '@angular/core';

import { Employee } from '../types';
import { UserService } from '@services/user.service';

export const agentResolver: ResolveFn<Employee> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const id = route.paramMap.get('id');
  return inject(UserService).getSingleEmployee(Number(id));
};
