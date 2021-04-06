"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CatedraticoController_1 = require("../controllers/CatedraticoController");
const jwt = require('jsonwebtoken');
class CatedraticoRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', verifyToken, CatedraticoController_1.catedraticoController.list);
        this.router.get('/:id', verifyToken, CatedraticoController_1.catedraticoController.get);
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
const catedraticoRoutes = new CatedraticoRoutes();
exports.default = catedraticoRoutes.router;
//# sourceMappingURL=CatedraticoRoutes.js.map