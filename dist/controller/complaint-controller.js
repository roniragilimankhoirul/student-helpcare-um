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
exports.ComplaintController = void 0;
const complaint_service_1 = require("../service/complaint-service");
class ComplaintController {
    static create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.user;
                const request = req.body;
                yield complaint_service_1.ComplaintService.create(request, id);
                res.status(200).json({
                    message: "Create a complaint successfully",
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static get(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.user;
                const result = yield complaint_service_1.ComplaintService.get(id);
                res.status(200).json({
                    data: result,
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static getById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const result = yield complaint_service_1.ComplaintService.getById(id);
                res.status(200).json({
                    data: result,
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static getAllBySchool(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.admin;
                const result = yield complaint_service_1.ComplaintService.getAllBySchool(id);
                res.status(200).json({
                    data: result,
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.ComplaintController = ComplaintController;
