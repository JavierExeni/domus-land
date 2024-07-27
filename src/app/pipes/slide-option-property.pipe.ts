import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'slideOptionProperty',
  standalone: true
})
export class SlideOptionPropertyPipe implements PipeTransform {

  transform(value: number): string {
    if (value > 10) {
      return 'Más de 10';
    }
    return value ? value.toString() : '';
  }
}
