import {Request, Response, Router} from 'express';
import {pensumController} from '../controllers/PensumController';
const jwt = require('jsonwebtoken');

class PensumRoutes{
    public router : Router = Router();
    
    constructor(){
        this.config();
    }
    config(): void{
        this.router.get('/',verifyToken,pensumController.list);
        this.router.get('/:id',verifyToken,pensumController.get);
        
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
const pensumRoutes = new PensumRoutes();
export  default pensumRoutes.router;