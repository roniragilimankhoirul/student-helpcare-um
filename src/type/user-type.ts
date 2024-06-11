import { Request } from "express";

export interface UserRequest extends Request {
  user?: string;
}
export type UserCreateRequest = {
  name: string;
  email: string;
  password: string;
  id_school: string;
};

export type UserLoginRequest = {
  email: string;
  password: string;
};
