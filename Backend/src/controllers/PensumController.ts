import express , {Request, Response} from 'express';
import pool from '../../DataBase/database';
const jwt = require('jsonwebtoken');
import bycrypt  from 'bcryptjs';
class PensumController{
    

    public async list (req: Request, res: Response){
       const auxiliar = await pool.query('select * from pensum');
        res.json(auxiliar);
    }

    public async get(req:Request, res:Response){
        const {id} = req.params;
        const auxiliar = await pool.query('select * from pensum where IdCursoPensum = ?',[id]);
        
        if(auxiliar.length > 0)
        {
            return res.json(auxiliar[0]);
        }
        else
        {
            res.status(404).json({text: 'El Pensum no existe en la base de datos'});
        }
    }
}

export const pensumController = new PensumController();
