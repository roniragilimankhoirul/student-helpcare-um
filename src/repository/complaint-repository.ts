import { Complaint } from "../model/complaint";

export interface ComplaintRepository {
  create(complaint: Complaint): Promise<void>;
  findAll(id_user: string): Promise<Complaint[]>;
  findById(id: string): Promise<Complaint | null>;
}
