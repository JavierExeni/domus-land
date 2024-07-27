import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PaginatorModule } from 'primeng/paginator';
import { SidebarModule } from 'primeng/sidebar';

import { PropertyService } from '@services/property.service';

import { PropertyFilterFormComponent } from './components/property-filter-form/property-filter-form.component';
import { PropertyGenericFilterComponent } from './components/property-generic-filter/property-generic-filter.component';
import { PropertyCardComponent } from './components/property-card/property-card.component';
import { PaginationComponent } from '../../../components/pagination/pagination.component';
import { EmptyListMessageComponent } from '../../../components/empty-list-message/empty-list-message.component';
import { SkeletonComponent } from '../../../components/skeleton/skeleton.component';

@Component({
  selector: 'app-list-properties',
  standalone: true,
  imports: [
    PropertyCardComponent,
    PropertyFilterFormComponent,
    PropertyGenericFilterComponent,
    PaginatorModule,
    SidebarModule,
    SkeletonComponent,
    EmptyListMessageComponent,
    PaginationComponent,
  ],
  templateUrl: './list-properties.component.html',
  styles: ``,
})
export class ListPropertiesComponent implements OnInit{
  propertyService = inject(PropertyService);
  activateRoute = inject(ActivatedRoute);
  router = inject(Router);

  sidebarFilters = false;

  first: number = 0;
  rows: number = 10;

  ngOnInit(): void {
    if (this.router.url.includes('tipo')) {
      this.activateRoute.params.subscribe({
        next: (res: any) => {
          this.propertyService
            .filteredProperties({ property_type: res.type })
            .subscribe();
        },
      });
    } else {
      if (this.router.url.includes('categoria')) {
        this.activateRoute.params.subscribe({
          next: (res: any) => {
            this.propertyService
              .filteredProperties({ property_category: res.category })
              .subscribe();
          },
        });
      } else {
        if (!this.propertyService.filter_general_property()) {
          this.propertyService.loadPublicPagiantedPropertyList();
        } else {
          this.propertyService
            .filteredProperties({
              ...this.propertyService.filter_general_property(),
            })
            .subscribe();
        }
      }
    }
  }


  onPageChange(event: any) {
    console.log(event);
    this.first = event.first;
    this.rows = event.rows;
    const page = event.page + 1;
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    setTimeout(() => {}, 2000);
    if (this.propertyService.filter_general_property()) {
      this.propertyService
        .filteredProperties(
          this.propertyService.filter_general_property(),
          page
        )
        .subscribe(() => {});
    } else {
      this.propertyService.loadPublicPagiantedPropertyList(page);
    }
  }
}
