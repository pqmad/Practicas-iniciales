import {Request, Response, Router} from 'express';
import {auxiliarController} from '../controllers/AuxiliarController';
const jwt = require('jsonwebtoken');

class AuxiliarRoutes{
    public router : Router = Router();
    
    constructor(){
        this.config();
    }
    config(): void{
        this.router.get('/',verifyToken,auxiliarController.list);
        this.router.get('/:id',verifyToken,auxiliarController.get);
        
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
const auxiliarRoutes = new AuxiliarRoutes();
export  default auxiliarRoutes.router;