const db = require('../database/models');
const bcryptjs = require ('bcryptjs') ; 
const { request, response } = require('express');
const path = require('path');

const validateEmailRegister  =  async (email, {req, res}) => {

    // console.log('gest middleware: ' + req.session.userLogged);
   
    let usuario = await db.User.findOne({where: { email : email } })
    
    if (usuario){
            throw new Error (`email ya existe`)
    }
}

const validatePasswordRegister  =  async (password, {req}) => {
 
        // valido password
        if (password !== req.body.passwordConfirm ){
                throw new Error (`confirmacion de password incorrecto`)       
                 }
        
}

const validateEmailLogin  =  async (email) => {

    // console.log('gest middleware: ' + req.session.userLogged);
   
    let usuario = await db.User.findOne({where: { email : email } })
    if (!usuario){
        throw new Error (`login:usuario no encontrado`)
    }
    // Le paso al otro middleware, para que compare password.
    request.usuario = usuario;
}


const validatePasswordLogin  =  async (password) => {
    
    if (request.usuario != undefined ){
        
        console.log(request.usuario['password'] + ' --- ' + password);   
        // valido password  
        if (!bcryptjs.compareSync(password, request.usuario['password'])) {
            
            throw new Error (`password incorrecto`)   
            }
    }
}

module.exports= {validateEmailRegister, validateEmailLogin, validatePasswordLogin, validatePasswordRegister};