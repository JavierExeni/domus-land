import { City } from "./city.type";

export type Employee = {
  id: number;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  contract_date: Date;
  phone: string;
  is_active: boolean;
  removed: boolean;
  seller_commission: number;
  consignee_commission: number;
  image_profile: string | null;
  city?: City;
  facebook?: string;
  instagram?: string;
  whatsapp?: string;
  tiktok?: string;
  properties_count?: number;
  groups: any[];
  is_consignee?: boolean;
}

export type Customer = {
  id: number;
  first_name: string;
  last_name: string;
  full_name?: string;
  phone: string;
  email: string;
  type: number;
  ci: string;
  birthdate: string;
  last_contact: string;
  address: string;
  is_active: boolean;
  created_by: Employee;
}


export enum USER_TYPE {
  ADMIN = 1,
  AGENTE = 2,
}

export enum USER_STATE {
  ACTIVE_USER,
  DESACTIVE_USER,
  DELETED_USER,
}

export enum CLIENT_TYPE {
  CLIENT = 0,
  OWNER = 1,
}
