const { validationResult } = require("express-validator");
const {request, response} = require('express')
const path = require('path');
const { CLIENT_RENEG_LIMIT } = require("tls");


// next en middleware: Indica que continue con la tarea que sigue al middleware, siempre debe estar.
const validarCampos = (req=request,res=response,next)=>{

    const errors = validationResult(req);

    if ( !errors.isEmpty() ){
        
        for (let error of errors.errors)
            {
                console.log(error)
        //     if (error.msg.includes('login') ){         
                                                         
        //                             return res.render(path.join(__dirname ,'../views/users/Login_prov'), { data :
        //                                     {
        //                                         status: 400, 
        //                                         error : {
        //                                         campo : error.param,
        //                                         }
        //                                     }
        //                                 });          
                                      
        // }  
    };
    return res.status(404).json(errors);
}
next();
}

module.exports= {validarCampos};