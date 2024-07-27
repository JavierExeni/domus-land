import { Pipe, PipeTransform } from '@angular/core';
import { PROPERTY_CATEGORY } from '../types';

@Pipe({
  name: 'propertyCategory',
  standalone: true,
})
export class PropertyCategoryPipe implements PipeTransform {
  transform(value: PROPERTY_CATEGORY): string {
    switch (value) {
      case PROPERTY_CATEGORY.HOUSE:
        return 'Casa';
      case PROPERTY_CATEGORY.STORE:
        return 'Baulera';
      case PROPERTY_CATEGORY.DEPARTMENT:
        return 'Departamento';
      case PROPERTY_CATEGORY.BUILDING:
        return 'Edificio';
      case PROPERTY_CATEGORY.SHED:
        return 'Galpon';
      case PROPERTY_CATEGORY.SHOP:
        return 'Local Comercial';
      case PROPERTY_CATEGORY.OFFICE:
        return 'Oficina';
      case PROPERTY_CATEGORY.PARKING:
        return 'Parqueo';
      case PROPERTY_CATEGORY.LAND:
        return 'Terreno';
    }
  }
}
