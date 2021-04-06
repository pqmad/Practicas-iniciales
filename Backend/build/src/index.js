"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const IndexRoutes_1 = __importDefault(require("./routes/IndexRoutes"));
const UsuarioRoutes_1 = __importDefault(require("./routes/UsuarioRoutes"));
const AuxiliarRoutes_1 = __importDefault(require("./routes/AuxiliarRoutes"));
const ComentarioRoutes_1 = __importDefault(require("./routes/ComentarioRoutes"));
const PensumRoutes_1 = __importDefault(require("./routes/PensumRoutes"));
const CursoRoutes_1 = __importDefault(require("./routes/CursoRoutes"));
const CursosAprobadosRoutes_1 = __importDefault(require("./routes/CursosAprobadosRoutes"));
const CursoCatedraticoRoutes_1 = __importDefault(require("./routes/CursoCatedraticoRoutes"));
const PublicacionRoutes_1 = __importDefault(require("./routes/PublicacionRoutes"));
const CatedraticoRoutes_1 = __importDefault(require("./routes/CatedraticoRoutes"));
const morgan_1 = __importDefault(require("morgan"));
const jwt = require('jsonwebtoken');
const session = require('express-session');
const cors_1 = __importDefault(require("cors"));
class Server {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan_1.default('dev'));
        this.app.use(cors_1.default());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.app.use(IndexRoutes_1.default);
        this.app.use('/Usuarios', UsuarioRoutes_1.default);
        this.app.use('/Catedratico', CatedraticoRoutes_1.default);
        this.app.use('/Auxiliar', AuxiliarRoutes_1.default);
        this.app.use('/Comentario', ComentarioRoutes_1.default);
        this.app.use('/Publicacion', PublicacionRoutes_1.default);
        this.app.use('/Curso', CursoRoutes_1.default);
        this.app.use('/CursoA', CursosAprobadosRoutes_1.default);
        this.app.use('/CursoCatedratico', CursoCatedraticoRoutes_1.default);
        this.app.use('/Pensum', PensumRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log("Servidor en el puerto: ", this.app.get('port'));
        });
    }
}
//fuciones
//variables globales
//public
//iniciar servidor
const servidor = new Server();
servidor.start();
//# sourceMappingURL=index.js.map