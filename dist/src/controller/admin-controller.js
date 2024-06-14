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
exports.AdminController = void 0;
const admin_service_1 = require("../service/admin-service");
class AdminController {
    static register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield admin_service_1.AdminService.register(req.body);
                res.status(200).json({ message: "Registration success" });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield admin_service_1.AdminService.login(req.body);
                res.status(200).json({ data: result });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static get(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const request = req.admin;
                const result = yield admin_service_1.AdminService.get(request);
                res.status(200).json({ data: result });
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.AdminController = AdminController;
