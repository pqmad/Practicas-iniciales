import {Request, Response, Router} from 'express';
import {comentarioController} from '../controllers/ComentarioController';
const jwt = require('jsonwebtoken');

class ComentarioRoutes{
    public router : Router = Router();
    
    constructor(){
        this.config();
    }
    config(): void{
        this.router.get('/',verifyToken,comentarioController.list);
        this.router.get('/Lista/:id',verifyToken,comentarioController.getList);
        this.router.post('/',verifyToken,comentarioController.create);
        this.router.delete('/:id',verifyToken,comentarioController.delete);
        this.router.put('/:id',verifyToken,comentarioController.update);
        this.router.get('/:id',verifyToken,comentarioController.get)
        
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
const comentarioRoutes = new ComentarioRoutes();
export  default comentarioRoutes.router;