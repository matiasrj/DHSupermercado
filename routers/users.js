const express= require('express')
const { Router } = require("express");
const userController = require("../controllers/usersController");
const multer = require('multer');

const path = require('path')
const publicPath = path.resolve(__dirname, 'public');
// Para recibir PUT / DELETE:
const methodOverride = require('method-override');

const { check, body } = require('express-validator');
const { validateEmailRegister, validateEmailLogin, validatePasswordLogin, validatePasswordRegister } = require('../middlewares/validateEmailPassword');
const { validarCampos } = require('../middlewares/validarCampos');
const { guestMiddleware } = require('../middlewares/guestMiddleware');
const { validateImage } = require('../middlewares/validateImage');
const req = require('express/lib/request');
const { request } = require('http');

const router = Router();
router.use(express.static(publicPath))

//multer
const storage = multer.diskStorage({
    destination : (req,file,cb)=> {
        let folder = path.join(__dirname, '../public/images/users');
        cb(null, folder);
    },
    filename : (req,file,cb)=>{
        let fileName = 'img_' + Date.now() + path.extname(file.originalname);
        cb(null, fileName);
    }
});

const upload = multer({storage});


router.use(methodOverride('_method'));

const validateLogin = [
    body('email')
    .notEmpty().withMessage('Debes completar el email').bail()
    .isEmail().withMessage('Debes completar un email válido')
    .custom (validateEmailLogin),
    body('password')
    .notEmpty().withMessage('Debes completar la contraseña').bail()
    .isLength({ min: 4 }).withMessage('La contraseña debe tener minimo 4 caracteres.').bail()
    .custom (validatePasswordLogin),
    ]

//
const registerUserMiddleware = [
    check('nombreApe').exists().withMessage('"Nombre y Apellido" es obligatorio').bail()
    .isLength({ min: 2}).withMessage('tipo de dato "Nombre y Apellido" incorrecto'),

    check('email').exists().withMessage('"email" es obligatorio').bail()
    .isEmail().withMessage('"email" no valido').bail()
    .custom( validateEmailRegister ),

    
    check('password').exists().withMessage('"contraseña" es obligatorio').bail()
    .isLength({ min: 8}).withMessage('"contraseña" debe tener longitud minima de 8 caracteres')
    .custom(validatePasswordRegister),
 
    check('imagenPerfil').custom( validateImage  ),
   

]



router.get('/login',guestMiddleware, userController.login);
router.post('/login',  [validateLogin ], userController.processLogin);

router.get('/logout', userController.logout);

router.get('/register', guestMiddleware, userController.register);
router.post('/register',[
                        upload.single('imagenPerfil'),
                        registerUserMiddleware,
                        ], userController.processRegister);


module.exports = router;