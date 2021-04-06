import {Request, Response, Router} from 'express';
import {catedraticoController} from '../controllers/CatedraticoController';
const jwt = require('jsonwebtoken');

class CatedraticoRoutes{
    public router : Router = Router();
    
    constructor(){
        this.config();
    }
    config(): void{
        this.router.get('/',verifyToken,catedraticoController.list);
        this.router.get('/:id',verifyToken,catedraticoController.get)
        
    }
    
}
function verifyToken(req: any, res: any, next: any){
    if(!req.headers.authorization){
        return res.status(401).send('No tiene autorización para ingresar');
    }
     const token = req.headers.authorization.split(' ')[1];
    if (token == 'null'){
        return res.status(401).send('No tiene autorización para ingresar');
    }
    const secret =  Buffer.from('secretkey', 'base64');
    const payload = jwt.verify(token, secret);
    req.userId = payload._id;
    next();
}   
const catedraticoRoutes = new CatedraticoRoutes();
export  default catedraticoRoutes.router;