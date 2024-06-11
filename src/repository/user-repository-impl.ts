import { User } from "../model/user";
import { UserRepository } from "./user-repository";
import { pool } from "../application/database";
export class UserRepositoryImpl implements UserRepository {
  async create(user: User): Promise<void> {
    const query = `INSERT INTO users (id,name,email,id_school, photo_url) VALUES($1,$2,$3,$4,$5)`;
    const values = [
      user.id,
      user.name,
      user.email,
      user.id_school,
      user.photo_url,
    ];
    await pool.query(query, values);
  }
  async findById(id: string): Promise<User | null> {
    const query = `SELECT u.id, u.name, u.email, u.photo_url, s.name AS school_name FROM users AS u JOIN schools AS s ON u.id_school = s.id WHERE u.id = $1`;
    const result = await pool.query(query, [id]);
    if (result.rows.length === 0) {
      return null;
    }
    return result.rows[0] as User;
  }
}
