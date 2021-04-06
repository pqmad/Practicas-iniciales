"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CursoAprobadoController_1 = require("../controllers/CursoAprobadoController");
const jwt = require('jsonwebtoken');
class CursosA {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/List/:id', CursoAprobadoController_1.cursoAprobadoController.getList);
        this.router.post('/', CursoAprobadoController_1.cursoAprobadoController.create);
        this.router.delete('/:id/:id2', verifyToken, CursoAprobadoController_1.cursoAprobadoController.delete);
        this.router.put('/:id/:id2', verifyToken, CursoAprobadoController_1.cursoAprobadoController.update);
        this.router.get('/:id/:id2', CursoAprobadoController_1.cursoAprobadoController.get);
    }
}
function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('No tiene autorización para ingresar');
    }
    const token = req.headers.authorization.split(' ')[1];
    if (token == 'null') {
        return res.status(401).send('No tiene autorización para ingresar');
    }
    const secret = Buffer.from('secretkey', 'base64');
    const payload = jwt.verify(token, secret);
    req.userId = payload._id;
    next();
}
const cursosA = new CursosA();
exports.default = cursosA.router;
//# sourceMappingURL=CursosAprobadosRoutes.js.map