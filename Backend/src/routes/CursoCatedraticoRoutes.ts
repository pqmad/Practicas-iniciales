import {Request, Response, Router} from 'express';
import {cursoCatedratico} from '../controllers/CursoCatedraticoController';
const jwt = require('jsonwebtoken');

class CursoCatedraticoRoutes{
    public router : Router = Router();
    
    constructor(){
        this.config();
    }
    config(): void{
        this.router.get('/',verifyToken,cursoCatedratico.getList);
        this.router.get('/:id',verifyToken,cursoCatedratico.get);
        
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
const cursoCatedraticoRoutes = new CursoCatedraticoRoutes();
export  default cursoCatedraticoRoutes.router;