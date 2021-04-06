import express , {request, Request, Response} from 'express';
import pool from '../../DataBase/database';
const jwt = require('jsonwebtoken');
class ComentarioController{
    

    public async list (req: Request, res: Response){
       const usuarios = await pool.query('select * from comentario ORDER BY idComentario desc');
        res.json(usuarios);
    }
    
    public async getList(req: Request, res: Response){
        const {id} = req.params;
        const comentarios = await pool.query('select * from comentario where Publicacion_id = ? ORDER BY idComentario desc',[id]);
        res.json(comentarios);
    }

    public async create (req: Request, res: Response){
        var NuevoComentario={
            Mensaje: req.body.Mensaje,
            Publicacion_id: req.body.Publicacion_id,
            Usuario_Carnet: req.body.Usuario_Carnet
        };
        await pool.query('INSERT INTO comentario set ?',[NuevoComentario]);
        res.status(200).json(NuevoComentario);
    }

    public async delete(req:Request, res:Response){
        const {id} = req.params;
        const usuario = await pool.query('DELETE FROM comentario WHERE idComentario = ?',[id]);
        console.log(req.body);
        res.json({mensaje: 'El Comentario fue eliminado con exito'});
    }

    public async update(req:Request, res:Response){
        const {id} = req.params;
        var NuevoComentario={
            idComentario: req.body.idComentario,
            Mensaje: req.body.Mensaje,
            Publicacion_id: req.body.Publicacion_id,
            Usuario_Carnet: req.body.Usuario_Carnet
        };
        const usuario = await pool.query('UPDATE comentario set ? WHERE idComentario = ?',[NuevoComentario,id]);
        res.json({mensaje: 'El Comentario fue actualizado con exito'});
    }

    public async get(req:Request, res:Response){
        const {id} = req.params;
        const usuario = await pool.query('select * from comentario where idComentario = ?',[id]);
        
        if(usuario.length > 0)
        {
            return res.json(usuario[0]);
        }
        else
        {
            res.status(404).json({text: 'El comentario no existe en la base de datos'});
        }
    }
}

export const comentarioController = new ComentarioController();
