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
exports.SchoolService = void 0;
const response_error_1 = require("../error/response-error");
const school_repository_impl_1 = require("../repository/school-repository-impl");
class SchoolService {
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const schoolRepositoryImpl = new school_repository_impl_1.SchoolRepositoryImpl();
            try {
                return yield schoolRepositoryImpl.findAll();
            }
            catch (error) {
                console.error("Error fetching schools:", error);
                throw new response_error_1.ResponseError(500, "Internal Server Error");
            }
        });
    }
    static getById(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const schoolRepositoryImpl = new school_repository_impl_1.SchoolRepositoryImpl();
            try {
                return schoolRepositoryImpl.findById(request);
            }
            catch (error) {
                console.error("Error fetching schools:", error);
                throw new response_error_1.ResponseError(500, "Internal Server Error");
            }
        });
    }
}
exports.SchoolService = SchoolService;
