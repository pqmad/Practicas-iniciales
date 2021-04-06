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
exports.codigoCurso = void 0;
const database_1 = __importDefault(require("../../DataBase/database"));
const jwt = require('jsonwebtoken');
class CodigoCurso {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const auxiliar = yield database_1.default.query('select * from curso');
            res.json(auxiliar);
        });
    }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const auxiliar = yield database_1.default.query('select * from curso where CodigoCurso = ?', [id]);
            if (auxiliar.length > 0) {
                return res.json(auxiliar[0]);
            }
            else {
                res.status(404).json({ text: 'El Curso no existe en la base de datos' });
            }
        });
    }
    listSelect(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const Cursos = yield database_1.default.query('select IdCursoPensum,CodigoCurso, Nombre from pensum t1 INNER JOIN curso t3 ON t1.Curso_CodigoCurso = t3.CodigoCurso where t1.IdCursoPensum NOT IN (select CursoP from cursosaprobados where CarnetU = ?)', [id]);
            res.json(Cursos);
        });
    }
    listSemestre(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, id2 } = req.params;
            const Cursos = yield database_1.default.query('select IdCursoPensum,CodigoCurso, Semestre, Creditos, Nombre from pensum t1 INNER JOIN curso t3 ON t1.Curso_CodigoCurso = t3.CodigoCurso where t1.IdCursoPensum NOT IN (select CursoP from cursosaprobados where CarnetU = ?) and t1.Semestre = ?', [id, id2]);
            res.json(Cursos);
        });
    }
}
exports.codigoCurso = new CodigoCurso();
//# sourceMappingURL=CursoController.js.map