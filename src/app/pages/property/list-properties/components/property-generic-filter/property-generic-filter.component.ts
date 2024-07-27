import { CommonModule } from '@angular/common';
import { Component, effect, inject, input } from '@angular/core';
import { CityService } from '@services/city.service';
import { FeatureService } from '@services/feature.service';
import { PropertyService } from '@services/property.service';

import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { GenericFilterNamePipe } from 'src/app/pipes/generic-filter-name.pipe';

import {
  getPropertyCategories,
  getPropertyTypes,
  PropertyFilter,
  Zone,
} from 'src/app/types';

export enum GENERICFILTER {
  'property_code',
  'city',
  'zones',
  'property_type',
  'property_category',
  'features',
}

type GenericFilterItem = {
  id: number | null;
  type: GENERICFILTER;
  value: string;
};

@Component({
  selector: 'app-property-generic-filter',
  standalone: true,
  imports: [CommonModule, TagModule, TooltipModule, GenericFilterNamePipe],
  templateUrl: './property-generic-filter.component.html',
  styles: ``,
})
export class PropertyGenericFilterComponent {
  filter_form = input<PropertyFilter | null>(null);

  chips: GenericFilterItem[] = [];

  zones: Zone[] = [];

  TYPES_ESTATE = getPropertyTypes();
  CATEGORIES = getPropertyCategories();

  propertyService = inject(PropertyService);
  cityService = inject(CityService);
  featureService = inject(FeatureService);

  constructor() {
    effect(() => {
      const obj = this.filter_form as any;
      for (let key in this.filter_form) {
        this.getValue(
          GENERICFILTER[key as keyof typeof GENERICFILTER],
          obj[key]
        );
      }
    });
  }

  getValue(key: GENERICFILTER, value: any) {
    this.chips = this.chips.filter((el) => el.type !== key);
    switch (key) {
      case GENERICFILTER.property_code:
        let hasChipPCode = this.chips.find((el) => el.type == key);
        if (hasChipPCode) {
          this.chips = [...this.chips.filter((el) => el.id !== -1)];
        }
        if (value == null || value == '') {
          break;
        }
        this.chips.push({
          id: -1,
          type: key,
          value,
        });
        break;
      case GENERICFILTER.city:
        let hasChipCity = this.chips.find((el) => el.type == key);
        if (hasChipCity) break;
        if (value == null || value == '') {
          break;
        }
        const city = this.cityService.cities().find((city) => city.id == value);
        this.zones = city?.zones!;
        this.chips.push({
          id: city!.id,
          type: key,
          value: city!.name,
        });
        break;
      case GENERICFILTER.zones:
        const chipZones = this.chips.filter((el) => el.type == key);
        if (value == null || value == '') {
          break;
        }
        value.forEach((element: number) => {
          const zone = this.zones.find((el: Zone) => el.id == element);
          let hasZone = chipZones.find((el) => el.id == zone?.id);
          if (!hasZone) {
            this.chips.push({
              id: zone!.id,
              type: key,
              value: zone!.name,
            });
          }
        });
        break;
      case GENERICFILTER.property_category:
        const chipCategories = this.chips.filter((el) => el.type == key);
        if (value == null || value == '') {
          break;
        }
        value.forEach((element: number) => {
          const category = this.CATEGORIES.find((el: any) => el.id == element);
          let hasCategory = chipCategories.find((el) => el.id == category?.id);
          if (!hasCategory) {
            this.chips.push({
              id: category!.id,
              type: key,
              value: category!.name,
            });
          }
        });
        break;
      case GENERICFILTER.property_type:
        const chipType = this.chips.filter((el) => el.type == key);
        if (value == null || value == '') {
          break;
        }
        value.forEach((element: number) => {
          const type = this.TYPES_ESTATE.find((el: any) => el.id == element);
          let hasType = chipType.find((el) => el.id == type?.id);
          if (!hasType) {
            this.chips.push({
              id: type!.id,
              type: key,
              value: type!.name,
            });
          }
        });
        break;
      case GENERICFILTER.features:
        const chipFeatures = this.chips.filter((el) => el.type == key);
        if (value == null || value == '') {
          break;
        }
        value.forEach((element: number) => {
          const feature = this.featureService
            .features()
            .find((el: any) => el.id == element);
          let hasFeature = chipFeatures.find((el) => el.id == feature?.id);
          if (!hasFeature) {
            this.chips.push({
              id: feature!.id,
              type: key,
              value: feature!.name,
            });
          }
        });
        break;
      default:
        break;
    }
  }

  removeChip(item: GenericFilterItem) {
    this.chips = [...this.chips.filter((el) => el.id != item.id)];
    switch (item.type) {
      case GENERICFILTER.property_code:
        this.propertyService.changeGeneralFilterState({
          ...this.propertyService.filter_general_property(),
          property_code: '',
        });
        this.propertyService.formFilter.get('property_code')!.setValue('');
        break;
      case GENERICFILTER.city:
        this.propertyService.changeGeneralFilterState({
          ...this.propertyService.filter_general_property(),
          city: 0,
          zones: [],
        });
        this.propertyService.formFilter.get('city')!.setValue('');
        this.propertyService.formFilter.get('zones')!.setValue('');
        this.chips = [
          ...this.chips.filter((el) => el.type !== GENERICFILTER.zones),
        ];
        break;
      case GENERICFILTER.zones:
        const newZones = this.propertyService.formFilter
          .get('zones')!
          .value.filter((el: any) => el !== item.id);
        this.propertyService.changeGeneralFilterState({
          ...this.propertyService.filter_general_property(),
          zones: [...newZones],
        });
        this.propertyService.formFilter.get('zones')!.setValue([...newZones]);
        break;
      case GENERICFILTER.property_category:
        const newCategories = this.propertyService.formFilter
          .get('property_category')!
          .value.filter((el: any) => el !== item.id);
        this.propertyService.changeGeneralFilterState({
          ...this.propertyService.filter_general_property(),
          property_category: [...newCategories],
        });
        this.propertyService.formFilter
          .get('property_category')!
          .setValue([...newCategories]);
        break;
      case GENERICFILTER.property_type:
        const newTypes = this.propertyService.formFilter
          .get('property_type')!
          .value.filter((el: any) => el !== item.id);
        this.propertyService.changeGeneralFilterState({
          ...this.propertyService.filter_general_property(),
          property_type: [...newTypes],
        });
        this.propertyService.formFilter
          .get('property_type')!
          .setValue([...newTypes]);
        break;
      case GENERICFILTER.features:
        const newFeatures = this.propertyService.formFilter
          .get('features')!
          .value.filter((el: any) => el !== item.id);
        this.propertyService.changeGeneralFilterState({
          ...this.propertyService.filter_general_property(),
          features: [...newFeatures],
        });
        this.propertyService.formFilter
          .get('features')!
          .setValue([...newFeatures]);
        break;
    }
  }
}
