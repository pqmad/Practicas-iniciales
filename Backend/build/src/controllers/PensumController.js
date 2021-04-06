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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pensumController = void 0;
const database_1 = __importDefault(require("../../DataBase/database"));
const jwt = require('jsonwebtoken');
class PensumController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const auxiliar = yield database_1.default.query('select * from pensum');
            res.json(auxiliar);
        });
    }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const auxiliar = yield database_1.default.query('select * from pensum where IdCursoPensum = ?', [id]);
            if (auxiliar.length > 0) {
                return res.json(auxiliar[0]);
            }
            else {
                res.status(404).json({ text: 'El Pensum no existe en la base de datos' });
            }
        });
    }
}
exports.pensumController = new PensumController();
//# sourceMappingURL=PensumController.js.map