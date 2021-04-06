"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PensumController_1 = require("../controllers/PensumController");
const jwt = require('jsonwebtoken');
class PensumRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', verifyToken, PensumController_1.pensumController.list);
        this.router.get('/:id', verifyToken, PensumController_1.pensumController.get);
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
//# sourceMappingURL=PensumRoutes.js.map