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
exports.ComplaintRepositoryImpl = void 0;
const database_1 = require("../application/database");
class ComplaintRepositoryImpl {
    create(complaint) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `INSERT INTO complaints (id_user,description) VALUES($1,$2,$3)`;
            const values = [complaint.id_user, complaint.description];
            yield database_1.pool.query(query, values);
        });
    }
    findAll(id_user) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `SELECT * FROM complaints WHERE id_user=$1 ORDER BY created_at DESC;`;
            const result = yield database_1.pool.query(query, [id_user]);
            return result.rows;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.pool.query("SELECT * FROM complaints WHERE id = $1", [
                id,
            ]);
            if (result.rows.length === 0) {
                return null;
            }
            return result.rows[0];
        });
    }
    findByAllBySchool(id_school) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `SELECT u.name, u.email, c.description, c.is_responded, c.comment
FROM users AS u
JOIN complaints AS c ON u.id = c.id_user WHERE u.id_school=$1`;
            const result = yield database_1.pool.query(query, [id_school]);
            return result.rows;
        });
    }
}
exports.ComplaintRepositoryImpl = ComplaintRepositoryImpl;
