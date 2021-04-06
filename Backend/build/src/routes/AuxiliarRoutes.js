"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuxiliarController_1 = require("../controllers/AuxiliarController");
const jwt = require('jsonwebtoken');
class AuxiliarRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', verifyToken, AuxiliarController_1.auxiliarController.list);
        this.router.get('/:id', verifyToken, AuxiliarController_1.auxiliarController.get);
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
const auxiliarRoutes = new AuxiliarRoutes();
exports.default = auxiliarRoutes.router;
//# sourceMappingURL=AuxiliarRoutes.js.map