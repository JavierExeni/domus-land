import { Property } from "./property.type";

export type Contact = {
  id:                number;
  name:              string;
  email?:             string;
  phone:             string;
  message:           string;
  state:             number;
  property_type?:     number;
  property_category?: number;
  property?:         SimpleProperty;
  contact_type:      number;
  created_at:        Date;
  updated_at:        Date;
}

export type ContactRequest = {
  name:              string;
  contact_type:      number;
  phone:             string;
  message:           string;
  email?:             string;
  property_type?:     number;
  property_category?: number;
  agent?:            number;
  property_id?:         number;
  property ?:         Property;
}


export enum CONTACT_TYPE {
  CLIENTE = 0,
  VENDEDOR = 1,
  AGENTE = 2
}

export enum CONTACT_STATE {
  RECIBIDO = 0,
  RESPONDIDO = 1
}

export type SimpleProperty = {
  id : number;
  code : string;
}
