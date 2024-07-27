import { Feature } from "./feature.type";
import { PropertyGallery } from "./property-gallery.type";
import { Customer, Employee } from "./user.type";
import { Zone } from "./zone.type";

export type Property = {
  id: number
  code:              string;
  property_title:    string;
  price:             number;
  phone:             string;
  address:           string;
  property_category: PROPERTY_CATEGORY;
  property_state:    PROPERTY_STATE;
  property_type:     PROPERTY_TYPE;
  total_area:        number;
  built_surface:     number;
  year_construction: string;
  pre_sale:          boolean;
  exclusivity:       boolean;
  seller_commission: number;
  contract_end_date: Date;
  description:       string;
  extras_comments:   string;
  latitude:          string;
  longitude:         string;
  folio_number:      string;
  bedrooms:          number;
  bedrooms_suite:    number;
  bathrooms:         number;
  num_parking:       number;
  banner:            string;
  consignee:         Employee;
  zone:              Zone;
  owner:             Customer;
  created_by:        Employee;
  features:          Feature[];
  gallery?:          PropertyGallery[];
  has_closure?:      boolean;
}

export interface PropertyRequest {
  property_title:    string;
  price:             number;
  phone:             string;
  address:           string;
  property_category: PROPERTY_CATEGORY;
  property_state:    PROPERTY_STATE;
  property_type:     PROPERTY_TYPE;
  total_area:        number;
  built_surface:     number;
  year_construction: string;
  pre_sale:          boolean;
  exclusivity:       boolean;
  seller_commission: number;
  contract_end_date: Date;
  description:       string;
  extras_comments:   string;
  latitude:          string;
  longitude:         string;
  folio_number:      string;
  bedrooms:          number;
  bedrooms_suite:    number;
  bathrooms:         number;
  num_parking:       number;
  consignee:         number;
  zone:              number;
  owner:             number;
  created_by:        number;
  features:          number[];
}


export enum PROPERTY_CATEGORY {
  HOUSE = 1,
  DEPARTMENT = 3,
  BUILDING = 4,
  SHED = 5,
  SHOP = 7,
  OFFICE = 8,
  PARKING = 9,
  LAND = 10,
  STORE = 11,
}

export function getPropertyCategories(): any[] {
  return [
    {
      id: PROPERTY_CATEGORY.HOUSE,
      name: 'Casa',
    },
    {
      id: PROPERTY_CATEGORY.BUILDING,
      name: 'Edificio',
    },
    {
      id: PROPERTY_CATEGORY.LAND,
      name: 'Terreno',
    },
    {
      id: PROPERTY_CATEGORY.STORE,
      name: 'Baulera',
    },
    {
      id: PROPERTY_CATEGORY.DEPARTMENT,
      name: 'Departamento',
    },
    {
      id: PROPERTY_CATEGORY.SHED,
      name: 'Galpon',
    },
    {
      id: PROPERTY_CATEGORY.SHOP,
      name: 'Local Comercial',
    },
    {
      id: PROPERTY_CATEGORY.OFFICE,
      name: 'Oficina',
    },
    {
      id: PROPERTY_CATEGORY.PARKING,
      name: 'Parqueo',
    },
  ];
}

export function getPropertyCategoryById(id: number) {
  return getPropertyCategories().find(el => el.id == id).name;
}


export enum PROPERTY_STATE {
  APPROVED,
  CLOSED,
  REMOVED,
  PENDING,
  ON_CLOSE_PROCEDURE
}


export function getPropertyState(): any[] {
  return [
    {
      id: PROPERTY_STATE.APPROVED,
      name: 'Aprobado',
    },
    {
      id: PROPERTY_STATE.CLOSED,
      name: 'Cerrado',
    },
    {
      id: PROPERTY_STATE.ON_CLOSE_PROCEDURE,
      name: 'En proceso de cierre',
    },
    {
      id: PROPERTY_STATE.REMOVED,
      name: 'Eliminado',
    },
    {
      id: PROPERTY_STATE.PENDING,
      name: 'Pendiente',
    },
  ];
}

export function getPropertyStateById(id: number) {
  return getPropertyState().find(el => el.id == id).name;
}

export enum PROPERTY_TYPE {
  RENT,
  ANTICRETIC,
  SALE,
}


export function getPropertyTypes(): any[] {
  return [
    {
      id: PROPERTY_TYPE.RENT,
      commission: 150,
      name: 'Alquiler',
    },
    {
      id: PROPERTY_TYPE.ANTICRETIC,
      commission: 3,
      name: 'Anticretico',
    },
    {
      id: PROPERTY_TYPE.SALE,
      commission: 3,
      name: 'Venta',
    },
  ];
}

export function getPropertyTypeById(id: number) {
  return getPropertyTypes().find(el => el.id == id);
}
