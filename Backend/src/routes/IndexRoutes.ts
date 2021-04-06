import {Router} from 'express';
import {IndexController} from '../controllers/indexController';

class IndexRoutes{
    public router : Router = Router();
    
    constructor(){
        this.config();
    }
    config(): void{
        this.router.get('/',IndexController.index);
    }
}
const indexRoutes = new IndexRoutes();
export  default indexRoutes.router;