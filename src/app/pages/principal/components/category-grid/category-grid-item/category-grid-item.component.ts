import { NgOptimizedImage, UpperCasePipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PROPERTY_CATEGORY } from 'src/app/types';

export interface CategoryItem {
  id: PROPERTY_CATEGORY;
  image: string | undefined;
  icon: string;
  title: string;
  width: number;
  height: number;
  widthIcon: number;
  heightIcon: number;
  priority: boolean;
}

@Component({
  selector: 'app-category-grid-item',
  standalone: true,
  imports: [NgOptimizedImage, UpperCasePipe, RouterLink],
  templateUrl: './category-grid-item.component.html',
  styles: ``,
})
export class CategoryGridItemComponent {
  item = input.required<CategoryItem>();

  router = inject(Router);
}
