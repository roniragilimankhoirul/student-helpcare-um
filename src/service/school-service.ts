import { ResponseError } from "../error/response-error";
import { School } from "../model/school";
import { SchoolRepositoryImpl } from "../repository/school-repository-impl";

export class SchoolService {
  static async getAll(): Promise<School[]> {
    const schoolRepositoryImpl = new SchoolRepositoryImpl();
    try {
      return await schoolRepositoryImpl.findAll();
    } catch (error) {
      console.error("Error fetching schools:", error);
      throw new ResponseError(500, "Internal Server Error");
    }
  }
  static async getById(request: string): Promise<School | null> {
    const schoolRepositoryImpl = new SchoolRepositoryImpl();
    try {
      return schoolRepositoryImpl.findById(request);
    } catch (error) {
      console.error("Error fetching schools:", error);
      throw new ResponseError(500, "Internal Server Error");
    }
  }
}
