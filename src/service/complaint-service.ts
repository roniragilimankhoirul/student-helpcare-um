import { Validation } from "../helper/validation";
import { ComplaintRepositoryImpl } from "../repository/complaint-repository-impl";
import { CreateComplaintRequest } from "../type/complaint-type";
import { ComplaintValidation } from "../validation/complaint-validation";
import { Complaint } from "../model/complaint";

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
      complaint_type: createComplaintRequest.complaint_type,
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
}