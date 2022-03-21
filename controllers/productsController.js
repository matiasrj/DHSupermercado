const { request, response } = require("express");
const { validationResult } = require("express-validator");
const fs = require('fs');
const { type } = require("os");
const path = require('path')


const db = require('../database/models'); 

const productsController = {

    productos: async (req=request, res = response)=>{
        
        let userLogged = await req.session.userLogged
        if (userLogged == null){
            userLogged={}
            userLogged.dataValues={}
            userLogged.dataValues.admin=null
        }

        let productos = await db.Product.findAll({where : { enabled : true} });
        res.render( path.join( __dirname , '../views/products/products'), {productos : productos, userLogged: userLogged.dataValues,errors:null}  );
    },


    producto: async (req=request, res = response)=>{

        let id = req.params.id;
        id = parseInt(id);

        let userLogged = await req.session.userLogged
        if (userLogged == null){
            userLogged={}
            userLogged.dataValues={}
            userLogged.dataValues.admin=false
        }
        console.log(userLogged)
        let producto = await db.Product.findOne({where: {id:id}});
        // console.log(producto.dataValues);
        const productosSimilares = await db.Product.findAll({where : { idCategory : producto.idCategory, enabled:true} } );

        // console.log(productosSimilares);
        res.render( path.join( __dirname , '../views/products/productDetail'), {producto : producto , productosSimilares: productosSimilares, 
                                                                                userLogged: userLogged.dataValues,errors:null}  );
    },

    borrar: async (req=request, res = response)=>{

        let id = req.params.id;
        // console.log(' borrar ' + req.params.id);
        let idprod = parseInt(id);
        
        // console.log('idprod ' + idprod+ ' ' + typeof(idprod));
        try {
        await db.Product.update({
            enabled:false},
            {
            where : {id : idprod}
        });
            
        } catch (error) {
            console.log(error);                
        }
        
        return res.redirect ( "/products/");
        // res.status(200).json({
        //     msg:"Borrado correctamente"
        // });  
    },

   
    
    crear : async (req = request, res = response)=>{
        let categorias = await db.Category.findAll()
        console.log(categorias)
        
        res.render(path.resolve(__dirname ,'../views/products/Formulario'), {categorias:categorias,errors:null} );
    },
    
    guardar : async (req = request, res = response)=>{
        const  {
            nombreProducto, 
            descripcionProducto,
            categoriaProducto,
            detallesProducto,
            precioProducto,
            descuentoProducto,
            habilitadoProducto,
            tamanoProducto,
            pesoProducto,
            garantiaProducto, 
            imagenProducto
            } = req.body;

    
            const errors = validationResult(req);
            if ( !errors.isEmpty() ){
                errors_msg = errors.mapped()
                console.log(errors_msg)
                return res.render(path.join(__dirname ,'../views/products/editFormulario'), { errors : errors_msg, producto : req.body
                });  
            }
    
            let habilitadoProductoBool=false;
            
            if (habilitadoProducto === 'on'){
                habilitadoProductoBool = true
            }

            
            const producto = {
            
            name:nombreProducto, 
            description:descripcionProducto,
            idCategory:parseInt(categoriaProducto),
            price: precioProducto,
            discount: descuentoProducto,
            enabled:habilitadoProductoBool,
            size:tamanoProducto,
            weight: pesoProducto,
            warranty:garantiaProducto,
            avatar:req.file.filename
            }
            console.log(producto);
        try {
            
            let productoDB = await db.Product.create ( producto );
             } catch (error) {
            
            console.log(error);
             }

        let categorias = await db.Category.findAll()
        res.render(path.resolve(__dirname ,'../views/products/Formulario'), {"guardado": true, errors:null, categorias:categorias});
    },

    editar : async (req = request, res = response)=>{
        let id = req.params.id;

        id = parseInt(id)
        
        let producto = await db.Product.findOne({where : { id : id }})
        let categorias = await db.Category.findAll()
    
        if (!producto){
            
        return res.redirect ( "/products/");
        }
        res.render(path.resolve(__dirname ,'../views/products/editFormulario'), {producto: producto, categorias:categorias,errors:null});
    },

    actualizar : async (req = request, res = response) => {
        const  {
            nombreProducto, 
            descripcionProducto,
            categoriaProducto,
            detallesProducto,
            precioProducto,
            descuentoProducto,
            habilitadoProducto,
            tamanoProducto,
            pesoProducto,
            garantiaProducto, 
            imagenProducto
            } = req.body;

            let categorias = await db.Category.findAll()
    
            const errors = validationResult(req);
            if ( !errors.isEmpty() ){
                errors_msg = errors.mapped()
                console.log(errors_msg)
                return res.render(path.join(__dirname ,'../views/products/editFormulario'), { errors : errors_msg,categorias:categorias,producto : req.body
                });  
            }

            const id = req.params.id;
            let idProd = parseInt(id);

            let habilitadoProductoBool=false;
            
            if (habilitadoProducto === 'on'){
                habilitadoProductoBool = true
            }
    
            const producto = {
                
                name:nombreProducto, 
                description:descripcionProducto,
                idCategory:parseInt(categoriaProducto),
                price: precioProducto,
                discount: descuentoProducto,
                enabled:habilitadoProductoBool,
                size:tamanoProducto,
                weight: pesoProducto,
                warranty:garantiaProducto,
                avatar:req.file.filename
                }
        

                try {
                    let prod = await db.Product.update(producto, {where : {id:idProd}});
                    console.log(prod);
                    
                } catch (error) {
                    console.log(error);
                }
        res.render(path.resolve(__dirname ,'../views/products/editFormulario'), {producto: producto, categorias:categorias,errors:null});
    
       
    },
    



    carrito : (req=request, res = response)=>{
        console.log('carrito');
        res.render(path.resolve(__dirname ,'../views/products/productCart'));
    }

}


module.exports = productsController;