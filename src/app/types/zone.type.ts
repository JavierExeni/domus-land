import { City } from './city.type';

export type Zone = {
  id: number;
  name: string;
  city: City;
};

export type ZoneRequest = Omit<Zone, 'id' | 'name'> & {
  city: number;
};
