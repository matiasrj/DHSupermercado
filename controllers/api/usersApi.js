const { request, response } = require("express");
const db = require("../../database/models");

const usersApiController = {

    list : async (req = request, res = response) =>{
        let users = await db.User.findAll();
        res.status(200).json(
            {   
                total : users.length,
                data: users
            }
        )
    },

    detail : async( req = request, res = response) =>{
        
        let id = req.params.id;
        id = parseInt(id);

        let user = await db.User.findOne({where: {id:id}});
        res.status(200).json(
            {   
                data: user
            }
        )
    },
}



module.exports = {usersApiController}