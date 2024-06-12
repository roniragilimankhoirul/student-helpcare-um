import { Request } from "express";

export interface AdminRequest extends Request {
  admin?: string;
}
export type AdminCreateRequest = {
  name: string;
  email: string;
  password: string;
  id_school: string;
};

export type AdminLoginRequest = {
  email: string;
  password: string;
};
