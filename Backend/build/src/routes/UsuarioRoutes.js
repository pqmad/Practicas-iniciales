"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UsuarioController_1 = require("../controllers/UsuarioController");
const jwt = require('jsonwebtoken');
class UsuarioRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', UsuarioController_1.usuarioController.list);
        this.router.post('/', UsuarioController_1.usuarioController.create);
        this.router.delete('/:id', verifyToken, UsuarioController_1.usuarioController.delete);
        this.router.put('/:id', UsuarioController_1.usuarioController.update);
        this.router.get('/:id', UsuarioController_1.usuarioController.get);
        this.router.post('/Login', UsuarioController_1.usuarioController.login);
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
const userRoutes = new UsuarioRoutes();
exports.default = userRoutes.router;
//# sourceMappingURL=UsuarioRoutes.js.map