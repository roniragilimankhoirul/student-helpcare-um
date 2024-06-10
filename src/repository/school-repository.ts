import { School } from "../model/school";

export interface SchoolRepository {
  findAll(): Promise<School[]>;
  findById(id: string): Promise<School | null>;
}
