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
exports.comentarioController = void 0;
const database_1 = __importDefault(require("../../DataBase/database"));
const jwt = require('jsonwebtoken');
class ComentarioController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuarios = yield database_1.default.query('select * from comentario ORDER BY idComentario desc');
            res.json(usuarios);
        });
    }
    getList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const comentarios = yield database_1.default.query('select * from comentario where Publicacion_id = ? ORDER BY idComentario desc', [id]);
            res.json(comentarios);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var NuevoComentario = {
                Mensaje: req.body.Mensaje,
                Publicacion_id: req.body.Publicacion_id,
                Usuario_Carnet: req.body.Usuario_Carnet
            };
            yield database_1.default.query('INSERT INTO comentario set ?', [NuevoComentario]);
            res.status(200).json(NuevoComentario);
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const usuario = yield database_1.default.query('DELETE FROM comentario WHERE idComentario = ?', [id]);
            console.log(req.body);
            res.json({ mensaje: 'El Comentario fue eliminado con exito' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            var NuevoComentario = {
                idComentario: req.body.idComentario,
                Mensaje: req.body.Mensaje,
                Publicacion_id: req.body.Publicacion_id,
                Usuario_Carnet: req.body.Usuario_Carnet
            };
            const usuario = yield database_1.default.query('UPDATE comentario set ? WHERE idComentario = ?', [NuevoComentario, id]);
            res.json({ mensaje: 'El Comentario fue actualizado con exito' });
        });
    }
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const usuario = yield database_1.default.query('select * from comentario where idComentario = ?', [id]);
            if (usuario.length > 0) {
                return res.json(usuario[0]);
            }
            else {
                res.status(404).json({ text: 'El comentario no existe en la base de datos' });
            }
        });
    }
}
exports.comentarioController = new ComentarioController();
//# sourceMappingURL=ComentarioController.js.map