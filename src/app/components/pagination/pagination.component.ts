import { NgClass, NgIf } from '@angular/common';
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [NgClass, NgIf],
  templateUrl: './pagination.component.html',
  styles: ``,
})
export class PaginationComponent {
  count = input(0);
  showCount = input(false);
  hasNext = input(false);
  refreshPage = output<number>();

  paginationOptions = [1, 2, 3, 4, 5];

  pageSelected = 1;

  pageOptions = 1;

  pageSize = 9;


  next() {
    if (!this.hasNext) {
      return;
    }
    this.pageOptions++;
    let page = this.pageOptions;
    this.refreshPage.emit(page);
  }

  previous() {
    if (this.pageOptions == 1) {
      return;
    }
    this.pageOptions--;
    let page = this.pageOptions;
    this.refreshPage.emit(page);
  }
}
