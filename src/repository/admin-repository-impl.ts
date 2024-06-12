import { Admin } from "../model/admin";
import { AdminRepository } from "./admin-repository";
import { pool } from "../application/database";

export class AdminRepositoryImpl implements AdminRepository {
  async create(admin: Admin): Promise<void> {
    const query = `INSERT INTO admins (id,name,email,id_school) VALUES($1,$2,$3,$4)`;
    const values = [admin.id, admin.name, admin.email, admin.id_school];
    await pool.query(query, values);
  }
  async findById(id: string): Promise<Admin | null> {
    const query = `SELECT * FROM admins WHERE id=$1`;
    const result = await pool.query(query, [id]);
    if (result.rows.length === 0) {
      return null;
    }
    return result.rows[0] as Admin;
  }
}
