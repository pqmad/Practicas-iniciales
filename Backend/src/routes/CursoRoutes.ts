import {Request, Response, Router} from 'express';
import {codigoCurso} from '../controllers/CursoController';
const jwt = require('jsonwebtoken');

class CursoRoutes{
    public router : Router = Router();
    
    constructor(){
        this.config();
    }
    config(): void{
        this.router.get('/',verifyToken,codigoCurso.list);
        this.router.get('/:id',verifyToken,codigoCurso.get);
        this.router.get('/Lista/:id',verifyToken,codigoCurso.listSelect);
        this.router.get('/Semestre/:id/:id2',verifyToken,codigoCurso.listSemestre);
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
const cursoRoutes = new CursoRoutes();
export  default cursoRoutes.router;