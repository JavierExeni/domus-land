import { Component, inject, model } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValueChangeEvent,
} from '@angular/forms';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';

import { BoliviaMapComponent } from '../bolivia-map/bolivia-map.component';

import {
  getPropertyCategories,
  getPropertyTypes,
  PropertyFilter,
  Zone,
} from 'src/app/types';

import { CityService } from '@services/city.service';
import { PropertyService } from '@services/property.service';

@Component({
  selector: 'app-init-filter-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    BoliviaMapComponent,
    MultiSelectModule,
    DropdownModule,
    InputTextModule,
  ],
  templateUrl: './init-filter-form.component.html',
  styles: `
     .main-filters {
        backdrop-filter: blur(6px);
        -webkit-backdrop-filter: blur(6.5px);
      }
  `,
})
export class InitFilterFormComponent {
  visible = model(false);

  cityService = inject(CityService);
  propertyService = inject(PropertyService);
  router = inject(Router);
  fb = inject(FormBuilder);

  formFilter: FormGroup = this.fb.group({
    property_type: [],
    property_category: [''],
    city: [''],
    zones: [''],
    property_code: [''],
    map: [''],
  });

  zones: Zone[] = [];

  types = getPropertyTypes();
  categories = getPropertyCategories();

  private _destroy$!: Subscription | undefined;
  private _destroy_city$!: Subscription | undefined;

  ngOnInit(): void {
    this._destroy_city$ = this.formFilter?.get('map')?.valueChanges.subscribe({
      next: (value: any) => {
        if (value) {
          const city_found = this.cityService
            .cities()
            .find((city) => city.name.includes(value));
          if (city_found) {
            this.formFilter?.get('city')?.setValue(city_found);
          }
        }
      },
    });
    this._destroy$ = this.formFilter?.get('city')?.valueChanges.subscribe({
      next: (value: any) => {
        this.zones = value!.zones;
      },
    });
  }

  onSubmit() {
    let propertyFilter: PropertyFilter = {
      ...this.formFilter.value,
    };
    propertyFilter.city = this.formFilter.get('city')!.value!.id;
    propertyFilter.zones = this.formFilter.get('zones')!.value!;
    this.propertyService.changeGeneralFilterState({ ...propertyFilter });
    this.propertyService.formFilter.patchValue({ ...propertyFilter });
    this.router.navigateByUrl('propiedades');
  }

  ngOnDestroy(): void {
    this._destroy$?.unsubscribe();
    this._destroy_city$?.unsubscribe();
  }
}
