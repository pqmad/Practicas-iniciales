import expres, {Application, Request, Response} from 'express';
import IndexRoutes from './routes/IndexRoutes';
import UsuarioRoutes from './routes/UsuarioRoutes';
import AuxiliarRoutes from './routes/AuxiliarRoutes';
import ComentarioRoutes from './routes/ComentarioRoutes';
import PensumRoutes from './routes/PensumRoutes';
import CursoRoutes from './routes/CursoRoutes';
import CursosAprobadosRoutes from './routes/CursosAprobadosRoutes';
import CursoCatedratico from './routes/CursoCatedraticoRoutes';

import PublicacionRoutes from './routes/PublicacionRoutes';
import CatedraticoRoutes from './routes/CatedraticoRoutes';

import morgan from 'morgan';
const jwt = require('jsonwebtoken');
const session =  require ('express-session');
import cors from 'cors';
import { cursoAprobadoController } from './controllers/CursoAprobadoController';
class Server{
    public app: Application;
    constructor(){
         this.app = expres();
        this.config();
        this.routes();

    }
    config(): void{
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(expres.json());
        this.app.use(expres.urlencoded({extended:false}));
    }
    routes(): void{
        this.app.use(IndexRoutes);
        this.app.use('/Usuarios',UsuarioRoutes);
        this.app.use('/Catedratico',CatedraticoRoutes);
        this.app.use('/Auxiliar',AuxiliarRoutes);
        this.app.use('/Comentario',ComentarioRoutes);
        this.app.use('/Publicacion',PublicacionRoutes);
        this.app.use('/Curso',CursoRoutes);
        this.app.use('/CursoA',CursosAprobadosRoutes);
        this.app.use('/CursoCatedratico',CursoCatedratico);
        this.app.use('/Pensum',PensumRoutes);
    }
    start(): void{
        this.app.listen(this.app.get('port'),()=>{
            console.log("Servidor en el puerto: ", this.app.get('port'))
        });
    }
}
//fuciones

//variables globales

//public

//iniciar servidor
const servidor = new Server();
servidor.start();