import {Request, Response, Router} from 'express';
import {cursoAprobadoController} from '../controllers/CursoAprobadoController';
const jwt = require('jsonwebtoken');

class CursosA{
    public router : Router = Router();
    
    constructor(){
        this.config();
    }
    config(): void{
        this.router.get('/List/:id',cursoAprobadoController.getList);
        this.router.post('/',cursoAprobadoController.create);
        this.router.delete('/:id/:id2',verifyToken,cursoAprobadoController.delete);
        this.router.put('/:id/:id2',verifyToken,cursoAprobadoController.update);
        this.router.get('/:id/:id2',cursoAprobadoController.get)
        
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
const cursosA = new CursosA();
export  default cursosA.router;