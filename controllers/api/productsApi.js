const { request, response } = require("express");
const db = require("../../database/models");

const productsApiController = {

    list : async (req = request, res = response) =>{
        let productos = await db.Product.findAll();
        res.status(200).json(
            {   
                total : productos.length,
                data: {
                    productos

                }
            }
        )
    },

    detail : async( req = request, res = response) =>{
        
        let id = req.params.id;
        id = parseInt(id);

        let producto = await db.Product.findOne({where: {id:id}});
        res.status(200).json(
            {   
                data: producto
            }
        )
    },
}



module.exports = {productsApiController}