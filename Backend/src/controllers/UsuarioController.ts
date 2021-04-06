import express , {Request, Response} from 'express';
import pool from '../../DataBase/database';
const jwt = require('jsonwebtoken');
import bycrypt  from 'bcryptjs';
class UsusarioController{
    

    public async list (req: Request, res: Response){
       const usuarios = await pool.query('select * from usuario');
        res.json(usuarios);
    }

    public async create (req: Request, res: Response){
        var pass="";
        bycrypt.genSalt(10, async function(err,salt){
            bycrypt.hash(req.body.Password,salt, async function(err,hash){
                var NuevoUsuario={
                    Carne: req.body.Carne,
                    Nombres: req.body.Nombres,
                    Apellido: req.body.Apellido,
                    Password: hash,
                    Correo: req.body.Correo
                };
                await pool.query('INSERT INTO usuario set ?',[NuevoUsuario]);
                const secret =  Buffer.from('secretkey', 'base64');
                var token = jwt.sign({_id: NuevoUsuario.Carne}, secret);
                res.status(200).json({token});
            });
        });
    }

    public async delete(req:Request, res:Response){
        const {id} = req.params;
        const usuario = await pool.query('DELETE FROM usuario WHERE Carne = ?',[id]);
        console.log(req.body);
        res.json({mensaje: 'El usuario con carne '+[id]+' fue eliminado con exito'});
    }

    public async update(req:Request, res:Response){
        const {id} = req.params;
        const confirm = req.body.Confirmar;
        if (confirm == undefined){
            const usuario = await pool.query('UPDATE usuario set ? WHERE Carne = ?',[req.body,id]);
            console.log(req.body);
            res.json({mensaje: 'El usuario con carne '+[id]+' fue actualizado con exito'});
        }else{
            bycrypt.genSalt(10, async function(err,salt){
                bycrypt.hash(req.body.Password,salt, async function(err,hash){
                    var NuevoUsuario={
                        Carne: req.body.Carne,
                        Nombres: req.body.Nombres,
                        Apellido: req.body.Apellido,
                        Password: hash,
                        Correo: req.body.Correo
                    };
                    const usuario = await pool.query('UPDATE usuario set ? WHERE Carne = ?',[NuevoUsuario,id]);
                    console.log(req.body);
                    res.json({mensaje: 'El usuario con carne '+[id]+' fue actualizado con exito'});
                });
            });
        }
        
        
    }

    public async get(req:Request, res:Response){
        const {id} = req.params;
        const usuario = await pool.query('select * from usuario where Carne = ?',[id]);
        
        if(usuario.length > 0)
        {
            return res.json(usuario[0]);
        }
        else
        {
            res.status(404).json({text: 'El usuario no existe en la base de datos'});
        }
    }

    public async login(req:Request, res:Response){
        const {Carne, Password} = req.body;
        const usuario = await pool.query('select * from usuario where Carne = ?',[Carne]);
        console.log(usuario);
        if (usuario.length==0) return res.status(401).send("El correo no existe");
        var pass="";
        pass =Password;
        console.log('Contraseña usuario:'+usuario[0].Password);
        console.log('Pass:'+pass);
        bycrypt.compare(pass,usuario[0].Password,function(err,result){
            console.log(result);
            if (!result) return res.status(401).send('Contraseña Erronea');
            const secret =  Buffer.from('secretkey', 'base64');
            const token = jwt.sign({_id: usuario.Carne}, secret);
            res.status(200).json({token});
        });
    }

}

export const usuarioController = new UsusarioController();
