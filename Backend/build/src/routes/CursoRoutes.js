"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CursoController_1 = require("../controllers/CursoController");
const jwt = require('jsonwebtoken');
class CursoRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', verifyToken, CursoController_1.codigoCurso.list);
        this.router.get('/:id', verifyToken, CursoController_1.codigoCurso.get);
        this.router.get('/Lista/:id', verifyToken, CursoController_1.codigoCurso.listSelect);
        this.router.get('/Semestre/:id/:id2', verifyToken, CursoController_1.codigoCurso.listSemestre);
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
const cursoRoutes = new CursoRoutes();
exports.default = cursoRoutes.router;
//# sourceMappingURL=CursoRoutes.js.map