import express , {Request, Response} from 'express';
import pool from '../../DataBase/database';
const jwt = require('jsonwebtoken');
class CursoCatedratico{
    

     public async getList(req: Request, res: Response){
         const cursosA = await pool.query('select * from curso_catedratico');
        res.json(cursosA);
     }
     
 
     public async get(req:Request, res:Response){
         const {id} = req.params;
         console.log('select * from curso_catedratico WHERE idCatedraticoCurso = ?',[id]);
         const usuario = await pool.query('select * from curso_catedratico WHERE idCatedraticoCurso = ?',[id]);
         if(usuario.length > 0)
         {
             return res.json(usuario[0]);
         }
         else
         {
             res.status(404).json({text: 'El Curso no existe en la base de datos'});
         }
     }

}

export const cursoCatedratico = new CursoCatedratico();
