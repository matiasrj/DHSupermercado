const express= require('express')
const { Router } = require("express");
const multer = require('multer');


const productsController = require("../controllers/productsController");

// path
const path = require('path')
const publicPath = path.resolve(__dirname, 'public');

//multer
const storage = multer.diskStorage({
    destination : (req,file,cb)=> {
        let folder = path.join(__dirname, '../public/images/products');
        cb(null, folder);
    },
    filename : (req,file,cb)=>{
        let fileName = 'img_' + Date.now() + path.extname(file.originalname);
        cb(null, fileName);
    }
});

const upload = multer({storage});


// Para recibir PUT / DELETE:
const methodOverride = require('method-override');

// middleware express validator
const { guestMiddleware } = require('../middlewares/guestMiddleware');
const { validarCampos } = require('../middlewares/validarCampos');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { body, check } = require('express-validator');
const { validateImage } = require('../middlewares/validateImage');




// router
const router = Router();
router.use(express.static(publicPath))
router.use(methodOverride('_method'));



const validateProduct = [
    body('nombreProducto')
    .notEmpty().withMessage('Nombre del producto es obligatorio').bail()
    .isLength({ min: 5}).withMessage('Nombre de producto debe tener al menos 5 caracteres'),
    
    body('descripcionProducto')
    .notEmpty().withMessage('Debes completar descripcion del product').bail()
    .isLength({ min: 20 }).withMessage('Descripcion debe contener minimo 20 caracteres.').bail(),

    check('imagenPerfil').custom( validateImage  ),
   
    ]





// routes
router.get('/carrito' ,[authMiddleware, validarCampos] , productsController.carrito);
router.get('/create', [authMiddleware, validarCampos], productsController.crear);
router.get('/:id/edit', [authMiddleware, validarCampos] ,productsController.editar);
router.put('/:id/edit',[upload.single('imagenProducto'),validateProduct] , productsController.actualizar);
router.get('/:id' ,productsController.producto);
router.delete('/:id/delete',productsController.borrar);
router.get('/', productsController.productos);
router.post('/',[upload.single('imagenProducto'), validateProduct] ,productsController.guardar);



module.exports = router;