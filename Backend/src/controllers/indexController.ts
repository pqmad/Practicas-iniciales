import {Request, Response} from 'express';

class indexController{
    public index (req: Request, res: Response){
        res.send('Soy un Index');
    }
    
}

export const IndexController = new indexController();