const express = require('express');

const path = require('path');

const cors = require('cors')

// manejo de sesiones
const session = require('express-session')

// cookies
const cookieParser = require('cookie-parser')


// Routers import
const usersRoutes =  require('./routers/users')
const productsRoutes = require('./routers/products')
const apiRoutes = require('./routers/api')

// middleware a nivel aplicacion
const { isUserLoggedMiddleware } = require('./middlewares/isUserLoggedMiddleware');


const app = express();

// PORT
const port=process.env.PORT || 3001;


// Ejs
app.set('view engine', 'ejs')




// carpeta publica.
const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath))

app.use(cors())


app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: false })); // to support URL-encoded bodies
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true }
  })) // set sessiones

  app.use(cookieParser());
  app.use(isUserLoggedMiddleware);


// Routes
app.use('/users',usersRoutes);
app.use('/products',productsRoutes);
app.use('/api',apiRoutes);

// Para recibir PUT / DELETE:
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

app.get('/', (req,res)=>{
    // res.redirect('/products/')
    res.render( path.resolve(__dirname,'views/Home'));
})


// Error 404
app.use((req, res, next) => {
    res.render(path.resolve(__dirname ,'./views/error404') );
    next();
    
})

// app.get('/carrito', (req,res)=>{
//     res.render(path.resolve(__dirname ,'views/products/ProductCart'));
// });

// app.get('/detalles', (req,res)=>{
//     res.render(path.resolve(__dirname ,'views/products/ProductDetail'));
// });

// app.get('/login', (req,res)=>{
//     res.render(path.resolve(__dirname ,'views/users/Login_prov'));
// });


// app.get('/register', (req,res)=>{
//     res.render(path.resolve(__dirname ,'views/users/Register_prov'));
// });


app.listen(port, ()=>{
    console.log(` Servidor activado en el puerto ${port}`)
})

