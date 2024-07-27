import { Country } from './country.type';
import { Zone } from './zone.type';

export type City = {
  id: number;
  name: string;
  code: string;
  country: Country;
  zones?: Zone[];
};

export type CityRequest = Omit<City, 'id'>;
