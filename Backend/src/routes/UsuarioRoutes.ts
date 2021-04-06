import {Request, Response, Router} from 'express';
import {usuarioController} from '../controllers/UsuarioController';
const jwt = require('jsonwebtoken');

class UsuarioRoutes{
    public router : Router = Router();
    
    constructor(){
        this.config();
    }
    config(): void{
        this.router.get('/',usuarioController.list);
        this.router.post('/',usuarioController.create);
        this.router.delete('/:id',verifyToken,usuarioController.delete);
        this.router.put('/:id',usuarioController.update);
        this.router.get('/:id',usuarioController.get);
        this.router.post('/Login',usuarioController.login);
        
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
const userRoutes = new UsuarioRoutes();
export  default userRoutes.router;