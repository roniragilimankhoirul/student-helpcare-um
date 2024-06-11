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
}
