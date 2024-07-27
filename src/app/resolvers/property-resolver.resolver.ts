import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { Property } from "../types";
import { PropertyService } from "@services/property.service";
import { inject } from "@angular/core";

export const propertyResolver: ResolveFn<Property> = (
  route: ActivatedRouteSnapshot, state: RouterStateSnapshot
) => {
  const id = route.paramMap.get('id');
  return inject(PropertyService).getSingleProperty(Number(id));
}
