import { USER_TYPE } from "./user.type";

export type AuthResponse = {
  access: string;
  refresh: string;
}

export type LoginRequest = {
  username: string;
  password: string;
}

export type AuthDecoded = {
  user_id: number;
  user: string;
  roles: number[];
};

export type CurrentUser = {
  id: number;
  email: string;
  image_profile: string | null;
  full_name: string;
  role: USER_TYPE;
}
