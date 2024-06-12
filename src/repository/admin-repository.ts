import { Admin } from "../model/admin";

export interface AdminRepository {
  create(admin: Admin): Promise<void>;
  findById(id: string): Promise<Admin | null>;
}
