"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CursoCatedraticoController_1 = require("../controllers/CursoCatedraticoController");
const jwt = require('jsonwebtoken');
class CursoCatedraticoRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', verifyToken, CursoCatedraticoController_1.cursoCatedratico.getList);
        this.router.get('/:id', verifyToken, CursoCatedraticoController_1.cursoCatedratico.get);
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
const cursoCatedraticoRoutes = new CursoCatedraticoRoutes();
exports.default = cursoCatedraticoRoutes.router;
//# sourceMappingURL=CursoCatedraticoRoutes.js.map