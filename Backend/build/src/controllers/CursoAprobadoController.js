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
exports.cursoAprobadoController = void 0;
const database_1 = __importDefault(require("../../DataBase/database"));
const jwt = require('jsonwebtoken');
class CursoAprobadoController {
    getList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const cursosA = yield database_1.default.query('select IdCursoPensum,CodigoCurso, Nombre, Creditos, Semestre, NotaAprobada from cursosaprobados t1 INNER JOIN pensum t2 ON t1.CarnetU = ? and t1.CursoP = t2.IdCursoPensum INNER JOIN curso t3 ON t2.Curso_CodigoCurso = t3.CodigoCurso', [id]);
            res.json(cursosA);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var NuevoCursoA = {
                CarnetU: req.body.CarnetU,
                CursoP: req.body.CursoP,
                NotaAprobada: req.body.NotaAprobada
            };
            yield database_1.default.query('INSERT INTO cursosaprobados set ?', [NuevoCursoA]);
            res.status(200).json(NuevoCursoA);
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, id2 } = req.params;
            const usuario = yield database_1.default.query('DELETE FROM cursosaprobados WHERE CarnetU = ? and CursoP = ?', [id, id2]);
            console.log(req.body);
            res.json({ mensaje: 'El Curso fue eliminado con exito' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, id2 } = req.params;
            const usuario = yield database_1.default.query('UPDATE cursosaprobados set ? WHERE CarnetU = ? and CursoP', [req.body, id, id2]);
            res.json({ mensaje: 'El Curso fue actualizado con exito' });
        });
    }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, id2 } = req.params;
            const usuario = yield database_1.default.query('select * from cursosaprobados WHERE CarnetU = ? and CursoP', [id, id2]);
            if (usuario.length > 0) {
                return res.json(usuario[0]);
            }
            else {
                res.status(404).json({ text: 'El Curso no existe en la base de datos' });
            }
        });
    }
}
exports.cursoAprobadoController = new CursoAprobadoController();
//# sourceMappingURL=CursoAprobadoController.js.map