"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComplaintService = void 0;
const validation_1 = require("../helper/validation");
const complaint_repository_impl_1 = require("../repository/complaint-repository-impl");
const complaint_validation_1 = require("../validation/complaint-validation");
const admin_repository_impl_1 = require("../repository/admin-repository-impl");
class ComplaintService {
    static create(request, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const createComplaintRequest = validation_1.Validation.validate(complaint_validation_1.ComplaintValidation.CREATE, request);
            const complaintRepositoryImpl = new complaint_repository_impl_1.ComplaintRepositoryImpl();
            yield complaintRepositoryImpl.create({
                id_user: id,
                description: createComplaintRequest.description,
            });
        });
    }
    static get(id_user) {
        return __awaiter(this, void 0, void 0, function* () {
            const getComplaintRequest = validation_1.Validation.validate(complaint_validation_1.ComplaintValidation.GET, id_user);
            const complaintRepositoryImpl = new complaint_repository_impl_1.ComplaintRepositoryImpl();
            return yield complaintRepositoryImpl.findAll(getComplaintRequest);
        });
    }
    static getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const getByIdComplaintRequest = validation_1.Validation.validate(complaint_validation_1.ComplaintValidation.GETBYID, id);
            const complaintRepositoryImpl = new complaint_repository_impl_1.ComplaintRepositoryImpl();
            return yield complaintRepositoryImpl.findById(getByIdComplaintRequest);
        });
    }
    static getAllBySchool(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const getByIdComplaintRequest = validation_1.Validation.validate(complaint_validation_1.ComplaintValidation.GETALLBYSCHOOL, id);
            const adminRepositoryImpl = new admin_repository_impl_1.AdminRepositoryImpl();
            const admin = yield adminRepositoryImpl.findById(id);
            const complaintRepositoryImpl = new complaint_repository_impl_1.ComplaintRepositoryImpl();
            return yield complaintRepositoryImpl.findByAllBySchool(admin === null || admin === void 0 ? void 0 : admin.id_school);
        });
    }
}
exports.ComplaintService = ComplaintService;
