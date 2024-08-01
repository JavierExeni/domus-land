import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { Employee, Property } from '../types';
import { PropertyService } from '@services/property.service';
import { inject } from '@angular/core';
import { UserService } from '@services/user.service';

export const propertyResolver: ResolveFn<Property> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const id = route.paramMap.get('id');
  return inject(PropertyService).getSingleProperty(Number(id));
};

export const propertyUserResolver: ResolveFn<Employee> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const userId = route.paramMap.get('userId');
  return inject(UserService).getSingleEmployee(Number(userId));
};

export const propertyAgentResolver: ResolveFn<Employee> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const agentId = route.paramMap.get('agentId');
  return inject(UserService).getSingleEmployee(Number(agentId));
};
