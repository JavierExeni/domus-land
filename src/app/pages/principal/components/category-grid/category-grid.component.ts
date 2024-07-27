import { Component, inject, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import {
  CategoryGridItemComponent,
  CategoryItem,
} from './category-grid-item/category-grid-item.component';

import { SystemService } from '@services/system.service';
import { PROPERTY_CATEGORY } from 'src/app/types';

@Component({
  selector: 'app-category-grid',
  standalone: true,
  imports: [CategoryGridItemComponent, NgFor],
  templateUrl: './category-grid.component.html',
  styles: ``,
})
export class CategoryGridComponent implements OnInit {
  systemService = inject(SystemService);

  options: CategoryItem[] = [];

  ngOnInit(): void {
    this.options = [
      {
        id: PROPERTY_CATEGORY.STORE,
        image: this.systemService.system()?.store_category_banner,
        icon: 'images/icons/Baulera',
        title: 'Baulera',
        width: 1024,
        height: 680,
        widthIcon: 2400,
        heightIcon: 1105,
        priority: false,
      },
      {
        id: PROPERTY_CATEGORY.HOUSE,
        image: this.systemService.system()?.house_category_banner,
        icon: 'images/icons/Casa',
        title: 'Casa',
        width: 750,
        height: 508,
        widthIcon: 100,
        heightIcon: 100,
        priority: false,
      },
      {
        id: PROPERTY_CATEGORY.BUILDING,
        image: this.systemService.system()?.building_category_banner,
        icon: 'images/icons/Edificio',
        title: 'Edificio',
        width: 750,
        height: 500,
        widthIcon: 100,
        heightIcon: 100,
        priority: false,
      },
      {
        id: PROPERTY_CATEGORY.DEPARTMENT,
        image: this.systemService.system()?.department_category_banner,
        icon: 'images/icons/Departamento',
        title: 'Departamento',
        width: 750,
        height: 500,
        widthIcon: 100,
        heightIcon: 100,
        priority: false,
      },
      {
        id: PROPERTY_CATEGORY.SHED,
        image: this.systemService.system()?.shed_category_banner,
        icon: 'images/icons/Galpon',
        title: 'Galpon',
        width: 750,
        height: 500,
        widthIcon: 100,
        heightIcon: 100,
        priority: false,
      },
      {
        id: PROPERTY_CATEGORY.SHOP,
        image: this.systemService.system()?.shop_category_banner,
        icon: 'images/icons/LocalComercial',
        title: 'Local comercial',
        width: 3000,
        height: 2000,
        widthIcon: 2400,
        heightIcon: 1105,
        priority: true,
      },
      {
        id: PROPERTY_CATEGORY.OFFICE,
        image: this.systemService.system()?.office_category_banner,
        icon: 'images/icons/Oficina',
        title: 'Oficina',
        width: 750,
        height: 500,
        widthIcon: 100,
        heightIcon: 100,
        priority: false,
      },
      {
        id: PROPERTY_CATEGORY.PARKING,
        image: this.systemService.system()?.parking_category_banner,
        icon: 'images/icons/Parqueo',
        title: 'Parqueo',
        width: 750,
        height: 1000,
        widthIcon: 100,
        heightIcon: 100,
        priority: false,
      },
      {
        id: PROPERTY_CATEGORY.LAND,
        image: this.systemService.system()?.land_category_banner,
        icon: 'images/icons/Terreno',
        title: 'Terreno',
        width: 750,
        height: 562,
        widthIcon: 100,
        heightIcon: 100,
        priority: false,
      },
    ];
  }
}
