import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  input,
  model,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { CityService } from '@services/city.service';
import { PropertyService } from '@services/property.service';

import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { SliderModule } from 'primeng/slider';
import { ListboxModule } from 'primeng/listbox';

import {
  concatMap,
  debounceTime,
  distinctUntilChanged,
  of,
  Subscription,
  switchMap,
} from 'rxjs';

import { SkeletonComponent } from 'src/app/components/skeleton/skeleton.component';
import { SlideOptionPropertyPipe } from '../../../../../pipes/slide-option-property.pipe';
import {
  getPropertyCategories,
  getPropertyTypes,
  PropertyFilter,
  Zone,
} from 'src/app/types';
import { FeatureService } from '@services/feature.service';

@Component({
  selector: 'app-property-filter-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DropdownModule,
    InputNumberModule,
    InputTextModule,
    SliderModule,
    SlideOptionPropertyPipe,
    MultiSelectModule,
    ListboxModule,
    SkeletonComponent,
  ],
  templateUrl: './property-filter-form.component.html',
  styles: ``,
})
export class PropertyFilterFormComponent implements OnInit, OnDestroy {
  agentId = input<number | undefined>();

  visible = model(false);

  fb = inject(FormBuilder);
  cityService = inject(CityService);
  propertyService = inject(PropertyService);
  featureService = inject(FeatureService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);

  zones: Zone[] = [];

  TYPES_ESTATE = getPropertyTypes();
  CATEGORIES = getPropertyCategories();

  propertyFilter!: PropertyFilter;

  get formFilter() {
    return this.propertyService.formFilter;
  }

  // GETTERS SLIDERS

  get ROOMS(): number {
    return this.formFilter.get('bedrooms')?.value;
  }

  get SUITE_ROOMS(): number {
    return this.formFilter.get('bedrooms_suite')?.value;
  }

  get BATHROOMS(): number {
    return this.formFilter.get('bathrooms')?.value;
  }

  get PARKINGS(): number {
    return this.formFilter.get('num_parking')?.value;
  }

  private _destroy$!: Subscription | undefined;
  private previousCityId: number | null = null;

  ngOnInit(): void {
    if (this.agentId()) {
      this.formFilter.patchValue({
        agent: this.agentId(),
      });
    }
    if (this.router.url.includes('tipo')) {
      this.activatedRoute.params.subscribe({
        next: (res: any) => {
          this.propertyService.changeGeneralFilterState({
            property_type: [Number(res.type)],
          });
          this.formFilter.patchValue({
            property_type: [Number(res.type)],
          });
        },
      });
    } else {
      if (this.router.url.includes('categoria')) {
        this.activatedRoute.params.subscribe({
          next: (res: any) => {
            this.propertyService.changeGeneralFilterState({
              property_category: [Number(res.category)],
            });
            this.formFilter.patchValue({
              property_category: [Number(res.category)],
            });
          },
        });
      } else {
        const cities = this.cityService.cities();
        const cityFound = cities.find(
          (el) => el.id === this.propertyService.formFilter.get('city')?.value
        );
        this.zones = cityFound?.zones as any;
        this.formFilter.patchValue({
          ...this.propertyService.formFilter.value,
          city: cityFound,
        });
        this.previousCityId = cityFound?.id ?? null;
      }
    }

    this._destroy$ = this.formFilter.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((res) => {
          const cityChanged = res.city && res.city.id !== this.previousCityId;
          if (cityChanged) {
            this.zones = res.city.zones;
            this.formFilter.patchValue(
              {
                zones: [],
              },
              { emitEvent: false }
            );
            this.previousCityId = res.city.id;
          }
          if (res.city === null) {
            this.zones = [];
            this.formFilter.patchValue(
              {
                zones: [],
              },
              { emitEvent: false }
            );
          }
          this.agentId()
            ? this.propertyService.changeAgentsFilterState({
                ...res,
                city: res.city?.id ?? '',
              })
            : this.propertyService.changeGeneralFilterState({
                ...res,
                city: res.city?.id ?? '',
              });
          return this.onSubmit();
        }),
        concatMap(() => of(this.propertyFilter))
      )
      .subscribe((res) => {
        this.propertyService.changeGeneralFilterState({
          ...res,
        });
      });
  }

  onSubmit() {
    this.propertyFilter = {
      ...this.formFilter.value,
    };
    if (this.propertyFilter.city) {
      this.propertyFilter.city = this.formFilter.get('city')!.value.id;
    }
    if (this.propertyFilter.zones) {
      this.propertyFilter.zones = this.formFilter.get('zones')!.value;
    }
    return this.propertyService.filteredProperties(this.propertyFilter, null);
  }

  ngOnDestroy(): void {
    this._destroy$?.unsubscribe();
  }
}
