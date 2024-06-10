import { School } from "../model/school";
import { SchoolRepository } from "./school-repository";
import { pool } from "../application/database";

export class SchoolRepositoryImpl implements SchoolRepository {
  async findAll(): Promise<School[]> {
    const query = `SELECT id, name FROM schools ORDER BY name ASC`;
    const result = await pool.query(query);
    return result.rows as School[];
  }
  async findById(id: string): Promise<School | null> {
    const result = await pool.query("SELECT * FROM schools WHERE id = $1", [
      id,
    ]);
    if (result.rows.length === 0) {
      return null;
    }
    return result.rows[0] as School;
  }
}
