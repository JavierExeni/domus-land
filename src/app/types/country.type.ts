export type Country = {
  id: number;
  name: string;
  code: string;
  phone_code: string;
};

export type CountryRequest = Omit<Country, 'id'>;
