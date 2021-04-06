"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ComentarioController_1 = require("../controllers/ComentarioController");
const jwt = require('jsonwebtoken');
class ComentarioRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', verifyToken, ComentarioController_1.comentarioController.list);
        this.router.get('/Lista/:id', verifyToken, ComentarioController_1.comentarioController.getList);
        this.router.post('/', verifyToken, ComentarioController_1.comentarioController.create);
        this.router.delete('/:id', verifyToken, ComentarioController_1.comentarioController.delete);
        this.router.put('/:id', verifyToken, ComentarioController_1.comentarioController.update);
        this.router.get('/:id', verifyToken, ComentarioController_1.comentarioController.get);
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
const comentarioRoutes = new ComentarioRoutes();
exports.default = comentarioRoutes.router;
//# sourceMappingURL=ComentarioRoutes.js.map