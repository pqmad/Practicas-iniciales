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
exports.cursoCatedratico = void 0;
const database_1 = __importDefault(require("../../DataBase/database"));
const jwt = require('jsonwebtoken');
class CursoCatedratico {
    getList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const cursosA = yield database_1.default.query('select * from curso_catedratico');
            res.json(cursosA);
        });
    }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            console.log('select * from curso_catedratico WHERE idCatedraticoCurso = ?', [id]);
            const usuario = yield database_1.default.query('select * from curso_catedratico WHERE idCatedraticoCurso = ?', [id]);
            if (usuario.length > 0) {
                return res.json(usuario[0]);
            }
            else {
                res.status(404).json({ text: 'El Curso no existe en la base de datos' });
            }
        });
    }
}
exports.cursoCatedratico = new CursoCatedratico();
//# sourceMappingURL=CursoCatedraticoController.js.map