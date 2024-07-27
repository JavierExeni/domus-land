import { Pipe, PipeTransform } from '@angular/core';
import { PROPERTY_TYPE } from '../types';

@Pipe({
  name: 'propertyType',
  standalone: true,
})
export class PropertyTypePipe implements PipeTransform {
  transform(value: PROPERTY_TYPE): string {
    switch (value) {
      case PROPERTY_TYPE.RENT:
        return 'Alquiler';
      case PROPERTY_TYPE.SALE:
        return 'Venta';
      case PROPERTY_TYPE.ANTICRETIC:
        return 'Anticretico';
    }
  }
}
