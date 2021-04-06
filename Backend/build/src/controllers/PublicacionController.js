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
exports.publicacionController = void 0;
const database_1 = __importDefault(require("../../DataBase/database"));
const jwt = require('jsonwebtoken');
class PublicacionController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuarios = yield database_1.default.query('select * from publicacion ORDER BY idPublicacion desc');
            res.json(usuarios);
        });
    }
    getList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const comentarios = yield database_1.default.query('select * from publicacion where idPublicacion = ? ORDER BY idPublicacion desc', [id]);
            res.json(comentarios);
        });
    }
    getList2(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const comentarios = yield database_1.default.query('select * from publicacion where Tipo = ? ORDER BY idPublicacion desc', [id]);
            res.json(comentarios);
        });
    }
    getListCate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const comentarios = yield database_1.default.query('select * from publicacion where Catedratico_NoCatedratico = ? ORDER BY idPublicacion desc', [id]);
            res.json(comentarios);
        });
    }
    getListAuxi(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const comentarios = yield database_1.default.query('select * from publicacion where Auxiliar_NoAuxiliar = ? ORDER BY idPublicacion desc', [id]);
            res.json(comentarios);
        });
    }
    getListCurso(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const comentarios = yield database_1.default.query('select * from publicacion where Curso_CodigoCurso = ? ORDER BY idPublicacion desc', [id]);
            res.json(comentarios);
        });
    }
    getListCursoCate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const comentarios = yield database_1.default.query('select * from publicacion where idCatedraticoCursoP = ? ORDER BY idPublicacion desc', [id]);
            res.json(comentarios);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var NuevaPublicacion = {
                Mensaje: req.body.Mensaje,
                Usuario_Carnet: req.body.Usuario_Carnet,
                Fecha_Date: req.body.Fecha_Date,
                idCatedraticoCursoP: req.body.idCatedraticoCursoP,
                Curso_CodigoCurso: req.body.Curso_CodigoCurso,
                Catedratico_NoCatedratico: req.body.Catedratico_NoCatedratico,
                Auxiliar_NoAuxiliar: req.body.Auxiliar_NoAuxiliar,
                Tipo: req.body.Tipo
            };
            yield database_1.default.query('INSERT INTO publicacion set ?', [NuevaPublicacion]);
            res.status(200).json(NuevaPublicacion);
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const usuario = yield database_1.default.query('DELETE FROM publicacion WHERE idPublicacion = ?', [id]);
            console.log(req.body);
            res.json({ mensaje: 'La publicacion fue eliminada con exito' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            var NuevaPublicacion = {
                idPublicacion: req.body.idPublicacion,
                Mensaje: req.body.Mensaje,
                Usuario_Carnet: req.body.Usuario_Carnet,
                Fecha_Date: req.body.Fecha_Date,
                idCatedraticoCursoP: req.body.idCatedraticoCursoP,
                Curso_CodigoCurso: req.body.Curso_CodigoCurso,
                Catedratico_NoCatedratico: req.body.Catedratico_NoCatedratico,
                Auxiliar_NoAuxiliar: req.body.Auxiliar_NoAuxiliar,
                Tipo: req.body.Tipo
            };
            const usuario = yield database_1.default.query('UPDATE publicacion set ? WHERE idPublicacion = ?', [NuevaPublicacion, id]);
            res.json({ mensaje: 'La publicacion fue actualizado con exito' });
        });
    }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const usuario = yield database_1.default.query('select * from publicacion where idPublicacion = ?', [id]);
            if (usuario.length > 0) {
                return res.json(usuario[0]);
            }
            else {
                res.status(404).json({ text: 'La pulblicación no existe en la base de datos' });
            }
        });
    }
}
exports.publicacionController = new PublicacionController();
//# sourceMappingURL=PublicacionController.js.map