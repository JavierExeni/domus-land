export type PropertyFilter = {
  property_code?: string;
  city?: number;
  zones?: number[];
  property_type?: number[];
  property_category?: number[];
  features?: number[];
  price_min?: number | null;
  price_max?: number | null;
  area_max?: number | null;
  area_min?: number | null;
  bedrooms?: number | null;
  bathrooms?: number | null;
  num_parking?: number | null;
  agent?: number | null;
};
