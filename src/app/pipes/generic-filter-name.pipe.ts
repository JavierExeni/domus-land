import { Pipe, PipeTransform } from '@angular/core';
import { GENERICFILTER } from '../pages/property/list-properties/components/property-generic-filter/property-generic-filter.component';

@Pipe({
  name: 'genericFilterName',
  standalone: true
})
export class GenericFilterNamePipe implements PipeTransform {

  transform(value: GENERICFILTER): string {
    switch(value){
      case GENERICFILTER.city:
        return 'Ciudad';
      case GENERICFILTER.features:
        return 'Caracteristica';
      case GENERICFILTER.property_category:
        return 'Categoria';
      case GENERICFILTER.property_code:
        return 'Nombre o Código';
      case GENERICFILTER.property_type:
        return 'Tipo';
      case GENERICFILTER.zones:
        return 'Zona';
      default:
        return '';
    }
  }
}
