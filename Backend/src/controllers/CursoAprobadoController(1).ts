import express , {Request, Response} from 'express';
import pool from '../../DataBase/database';
const jwt = require('jsonwebtoken');
class CursoAprobadoController{
    

     public async getList(req: Request, res: Response){
         const {id} = req.params;
         const cursosA = await pool.query('select IdCursoPensum,CodigoCurso, Nombre, Creditos, Semestre, NotaAprobada from cursosaprobados t1 INNER JOIN pensum t2 ON t1.CarnetU = ? and t1.CursoP = t2.IdCursoPensum INNER JOIN curso t3 ON t2.Curso_CodigoCurso = t3.CodigoCurso',[id]);
          res.json(cursosA);
     }
     
     public async create (req: Request, res: Response){
         var NuevoCursoA={
             CarnetU: req.body.CarnetU,
             CursoP: req.body.CursoP,
             NotaAprobada: req.body.NotaAprobada
         };
         await pool.query('INSERT INTO cursosaprobados set ?',[NuevoCursoA]);
         res.status(200).json(NuevoCursoA);
     }
 
     public async delete(req:Request, res:Response){
         const {id,id2} = req.params;
         const usuario = await pool.query('DELETE FROM cursosaprobados WHERE CarnetU = ? and CursoP = ?',[id, id2]);
         console.log(req.body);
         res.json({mensaje: 'El Curso fue eliminado con exito'});
     }
 
     public async update(req:Request, res:Response){
         const {id,id2} = req.params;
         const usuario = await pool.query('UPDATE cursosaprobados set ? WHERE CarnetU = ? and CursoP',[req.body,id,id2]);
         res.json({mensaje: 'El Curso fue actualizado con exito'});
     }
 
     public async get(req:Request, res:Response){
         const {id,id2} = req.params;
         const usuario = await pool.query('select * from cursosaprobados WHERE CarnetU = ? and CursoP',[id, id2]);
         
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

export const cursoAprobadoController = new CursoAprobadoController();
