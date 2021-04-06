import express , {Request, Response} from 'express';
import pool from '../../DataBase/database';
const jwt = require('jsonwebtoken');
class CatedraticoController{
    

    public async list (req: Request, res: Response){
       const auxiliar = await pool.query('select * from catedratico');
        res.json(auxiliar);
    }

    public async get(req:Request, res:Response){
        const {id} = req.params;
        const auxiliar = await pool.query('select * from catedratico where NoCatedratico = ?',[id]);
        
        if(auxiliar.length > 0)
        {
            return res.json(auxiliar[0]);
        }
        else
        {
            res.status(404).json({text: 'El Catedratico no existe en la base de datos'});
        }
    }
}

export const catedraticoController = new CatedraticoController();
