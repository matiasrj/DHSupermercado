const { request } = require("express");
const path = require('path')

const validateImage  = (imagen, {req, res}) => {

    // console.log('tipo de dato ' + JSON.stringify(req.file));

    if (typeof req.file == undefined){
        throw new Error (`imagenPerfil es obligatorio`)
        }

    filename = req.file.originalname;
    let extension = (path.extname(filename)).toLowerCase();
        switch (extension) {
            case '.jpg':
                // return '.jpg';
                break;
            case '.jpeg':
                // return '.jpeg';
                break;
            case  '.png':
                // return '.png';
                break;
            case  '.gif':
                // return '.png';
                break;
            default:
                throw new Error (`imagenPerfil solo admite formato jpg, png y jpeg`);
        }

    return true;
}



module.exports= {validateImage};