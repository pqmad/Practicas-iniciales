"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PublicacionController_1 = require("../controllers/PublicacionController");
const jwt = require('jsonwebtoken');
class PensumRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', verifyToken, PublicacionController_1.publicacionController.list);
        this.router.get('/:id', verifyToken, PublicacionController_1.publicacionController.get);
        this.router.get('/Tipo/:id', verifyToken, PublicacionController_1.publicacionController.getList2);
        this.router.get('/Curso/:id', verifyToken, PublicacionController_1.publicacionController.getListCurso);
        this.router.get('/CursoCate/:id', verifyToken, PublicacionController_1.publicacionController.getListCursoCate);
        this.router.get('/Aux/:id', verifyToken, PublicacionController_1.publicacionController.getListAuxi);
        this.router.get('/Cate/:id', verifyToken, PublicacionController_1.publicacionController.getListCate);
        this.router.post('/', verifyToken, PublicacionController_1.publicacionController.create);
        this.router.delete('/:id', verifyToken, verifyToken, PublicacionController_1.publicacionController.delete);
        this.router.put('/:id', verifyToken, PublicacionController_1.publicacionController.update);
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
const pensumRoutes = new PensumRoutes();
exports.default = pensumRoutes.router;
//# sourceMappingURL=PublicacionRoutes.js.map