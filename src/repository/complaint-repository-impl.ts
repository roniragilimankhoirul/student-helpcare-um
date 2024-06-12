import { pool } from "../application/database";
import { Complaint } from "../model/complaint";
import { ComplaintRepository } from "./complaint-repository";
export class ComplaintRepositoryImpl implements ComplaintRepository {
  async create(complaint: Complaint): Promise<void> {
    const query = `INSERT INTO complaints (id_user, complaint_type,description) VALUES($1,$2,$3)`;
    const values = [
      complaint.id_user,
      complaint.complaint_type,
      complaint.description,
    ];
    await pool.query(query, values);
  }
  async findAll(id_user: string): Promise<Complaint[]> {
    const query = `SELECT * FROM complaints WHERE id_user=$1 ORDER BY created_at DESC;`;
    const result = await pool.query(query, [id_user]);
    return result.rows as Complaint[];
  }
  async findById(id: string): Promise<Complaint | null> {
    const result = await pool.query("SELECT * FROM complaints WHERE id = $1", [
      id,
    ]);
    if (result.rows.length === 0) {
      return null;
    }
    return result.rows[0] as Complaint;
  }
}
