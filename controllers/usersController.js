const { request, response } = require("express");
const path = require('path');
const bcryptjs = require ('bcryptjs') ;
const cookie = require('cookie-parser');
const fs = require ('fs');

const db = require('../database/models'); 
const { validationResult } = require("express-validator");

const userController = {

    
    login : (req=request, res= response)=> {
        res.render(path.resolve(__dirname ,'../views/users/Login_prov'),{errors : null});
    },

    processLogin : async (req=request, res= response) => {

        const {
            email,
            password,
            recordarUsuario
        } = req.body;
        
        console.log('Process Login: ' + email + '  '  + password + '  ' +recordarUsuario);

        const errors = validationResult(req);
        if ( !errors.isEmpty() ){
            errors_msg = errors.mapped()
            console.log(errors_msg)
            return res.render(path.join(__dirname ,'../views/users/Login_prov'), { errors : errors_msg,old : req.body
            });  
        }

        let userSession = {};
        Object.assign(userSession, req.usuario);
        userSession.password= ''
        req.session.userLogged = userSession;
        
        if (recordarUsuario) {
            console.log('Guardo cookie');
            res.cookie('userEmail', email, {maxAge : (1000 * 60 ) * 2 }); // guardo por 2 minutos
        }        
        res.redirect('/');
    },


    logout : (req=request, res= response) => {

        req.session.destroy();
        res.clearCookie('userEmail');
        console.log('logout: ' + req.session);
        res.redirect ( "/");
    },


    
    
    register: (req=request, res= response)=> {
        
        
        res.render(path.resolve(__dirname ,'../views/users/Register_prov'), {errors : null});
    },


    processRegister : async (req=request, res= response)=> {
        const  {
            nombreApe, 
            nombreUsuario,
            fechaNac,
            Adress,
            email,
            password,
            passwordConfirm,
            imagenPerfil,
        } = req.body;
        
        try {
            
        const errors = validationResult(req);
        if ( !errors.isEmpty() ){
            errors_msg = errors.mapped()
            console.log(errors_msg)
            // errors_msg = JSON.stringify(errors_msg)
            // console_log(errors_msg)
            return res.render(path.join(__dirname ,'../views/users/Register_prov'), { errors : errors_msg,old : req.body
            });  
        }

    
        // encripto password
        const salt = bcryptjs.genSaltSync(10);
        const passwordHash = bcryptjs.hashSync (password, salt);

        const user = {
            nombreApe, 
            nombreUsuario,
            fechaNac,
            Adress,
            email,
            password : passwordHash,
            avatar : req.file.filename,
            passwordtest : password,
        }
         
        await db.User.create({
            firstName: user.nombreUsuario,
            lastName: user.nombreApe,
            email : user.email,
            password : user.password,
            avatar : user.avatar,
            fechaNac : user.fechaNac,
            createdAt: "2019-12-01T03:55:41.000Z",
            updatedAt: "2019-12-01T03:55:41.000Z",
        });

        res.redirect('/');
    } catch (error) {
            console.log('No se pudo registrar el usuario')
    }

    },

}


module.exports = userController;