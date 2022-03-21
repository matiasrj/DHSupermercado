const { request, response } = require("express");
const db = require("../../database/models");

const categoryApiController = {

    list : async (req = request, res = response) =>{
        let categories = await db.Category.findAll();
        res.status(200).json(
            {   
                total : categories.length,
                data: {
                    categories

                }
            }
        )
    },

    detail : async( req = request, res = response) =>{
        
        let id = req.params.id;
        id = parseInt(id);

        let category = await db.Category.findOne({where: {id:id}});
        res.status(200).json(
            {   
                data: category
            }
        )
    },
}



module.exports = {categoryApiController}