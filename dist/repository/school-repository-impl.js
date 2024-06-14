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
exports.SchoolRepositoryImpl = void 0;
const database_1 = require("../application/database");
class SchoolRepositoryImpl {
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `SELECT id, name FROM schools ORDER BY name ASC`;
            const result = yield database_1.pool.query(query);
            return result.rows;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.pool.query("SELECT * FROM schools WHERE id = $1", [
                id,
            ]);
            if (result.rows.length === 0) {
                return null;
            }
            return result.rows[0];
        });
    }
}
exports.SchoolRepositoryImpl = SchoolRepositoryImpl;
