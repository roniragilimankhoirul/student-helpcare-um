import { Validation } from "../helper/validation";
import { ComplaintRepositoryImpl } from "../repository/complaint-repository-impl";
import { CreateComplaintRequest } from "../type/complaint-type";
import { ComplaintValidation } from "../validation/complaint-validation";
import { Complaint } from "../model/complaint";
import { AdminRepositoryImpl } from "../repository/admin-repository-impl";

export class ComplaintService {
  static async create(
    request: CreateComplaintRequest,
    id: string
  ): Promise<void> {
    const createComplaintRequest = Validation.validate(
      ComplaintValidation.CREATE,
      request
    );
    const complaintRepositoryImpl = new ComplaintRepositoryImpl();
    await complaintRepositoryImpl.create({
      id_user: id,
      description: createComplaintRequest.description,
    });
  }
  static async get(id_user: string): Promise<Complaint[]> {
    const getComplaintRequest = Validation.validate(
      ComplaintValidation.GET,
      id_user
    );
    const complaintRepositoryImpl = new ComplaintRepositoryImpl();
    return await complaintRepositoryImpl.findAll(getComplaintRequest);
  }
  static async getById(id: string): Promise<Complaint | null> {
    const getByIdComplaintRequest = Validation.validate(
      ComplaintValidation.GETBYID,
      id
    );
    const complaintRepositoryImpl = new ComplaintRepositoryImpl();
    return await complaintRepositoryImpl.findById(getByIdComplaintRequest);
  }
  static async getAllBySchool(id: string): Promise<Complaint[]> {
    const getByIdComplaintRequest = Validation.validate(
      ComplaintValidation.GETALLBYSCHOOL,
      id
    );
    const adminRepositoryImpl = new AdminRepositoryImpl();
    const admin = await adminRepositoryImpl.findById(id);
    const complaintRepositoryImpl = new ComplaintRepositoryImpl();
    return await complaintRepositoryImpl.findByAllBySchool(admin?.id_school!);
  }
}
