import express , {request, Request, Response} from 'express';
import pool from '../../DataBase/database';
const jwt = require('jsonwebtoken');
class PublicacionController{
    

    public async list (req: Request, res: Response){
       const usuarios = await pool.query('select * from publicacion ORDER BY idPublicacion desc');
        res.json(usuarios);
    }
    
    public async getList(req: Request, res: Response){
        const {id} = req.params;
        const comentarios = await pool.query('select * from publicacion where idPublicacion = ? ORDER BY idPublicacion desc',[id]);
        res.json(comentarios);
    }

    public async getList2(req: Request, res: Response){
        const {id} = req.params;
        const comentarios = await pool.query('select * from publicacion where Tipo = ? ORDER BY idPublicacion desc',[id]);
        res.json(comentarios);
    }

    public async getListCate(req: Request, res: Response){
        const {id} = req.params;
        const comentarios = await pool.query('select * from publicacion where Catedratico_NoCatedratico = ? ORDER BY idPublicacion desc',[id]);
        res.json(comentarios);
    }

    public async getListAuxi(req: Request, res: Response){
        const {id} = req.params;
        const comentarios = await pool.query('select * from publicacion where Auxiliar_NoAuxiliar = ? ORDER BY idPublicacion desc',[id]);
        res.json(comentarios);
    }

    public async getListCurso(req: Request, res: Response){
        const {id} = req.params;
        const comentarios = await pool.query('select * from publicacion where Curso_CodigoCurso = ? ORDER BY idPublicacion desc',[id]);
        res.json(comentarios);
    }

    public async getListCursoCate(req: Request, res: Response){
        const {id} = req.params;
        const comentarios = await pool.query('select * from publicacion where idCatedraticoCursoP = ? ORDER BY idPublicacion desc',[id]);
        res.json(comentarios);
    }

    public async create (req: Request, res: Response){
        var NuevaPublicacion={
            Mensaje: req.body.Mensaje,
            Usuario_Carnet: req.body.Usuario_Carnet,
            Fecha_Date: req.body.Fecha_Date,
            idCatedraticoCursoP: req.body.idCatedraticoCursoP,
            Curso_CodigoCurso: req.body.Curso_CodigoCurso,
            Catedratico_NoCatedratico: req.body.Catedratico_NoCatedratico,
            Auxiliar_NoAuxiliar: req.body.Auxiliar_NoAuxiliar,
            Tipo: req.body.Tipo
        };
        await pool.query('INSERT INTO publicacion set ?',[NuevaPublicacion]);
        res.status(200).json(NuevaPublicacion);
    }

    public async delete(req:Request, res:Response){
        const {id} = req.params;
        const usuario = await pool.query('DELETE FROM publicacion WHERE idPublicacion = ?',[id]);
        console.log(req.body);
        res.json({mensaje: 'La publicacion fue eliminada con exito'});
    }

    public async update(req:Request, res:Response){
        const {id} = req.params;
        var NuevaPublicacion={
            idPublicacion: req.body.idPublicacion,
            Mensaje: req.body.Mensaje,
            Usuario_Carnet: req.body.Usuario_Carnet,
            Fecha_Date: req.body.Fecha_Date,
            idCatedraticoCursoP: req.body.idCatedraticoCursoP,
            Curso_CodigoCurso: req.body.Curso_CodigoCurso,
            Catedratico_NoCatedratico: req.body.Catedratico_NoCatedratico,
            Auxiliar_NoAuxiliar: req.body.Auxiliar_NoAuxiliar,
            Tipo: req.body.Tipo
        };
        const usuario = await pool.query('UPDATE publicacion set ? WHERE idPublicacion = ?',[NuevaPublicacion,id]);
        res.json({mensaje: 'La publicacion fue actualizado con exito'});
    }

    public async get(req:Request, res:Response){
        const {id} = req.params;
        const usuario = await pool.query('select * from publicacion where idPublicacion = ?',[id]);
        
        if(usuario.length > 0)
        {
            return res.json(usuario[0]);
        }
        else
        {
            res.status(404).json({text: 'La pulblicación no existe en la base de datos'});
        }
    }
}

export const publicacionController = new PublicacionController();
