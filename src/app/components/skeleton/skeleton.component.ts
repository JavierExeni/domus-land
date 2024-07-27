import { Component, input } from '@angular/core';

@Component({
  selector: 'app-skeleton',
  standalone: true,
  imports: [],
  templateUrl: './skeleton.component.html',
  styles: ``,
})
export class SkeletonComponent {
  horizontal = input(false);
  filterForm = input(false);
}
