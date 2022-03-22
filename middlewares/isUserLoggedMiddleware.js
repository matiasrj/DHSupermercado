

const db = require('../database/models'); 

const isUserLoggedMiddleware  = async  (req, res, next) => {
    res.locals.isLogged = false;

    // console.log('Cookies :  ' + req.cookies);

    if (req.cookies){

    let emailCookie = req.cookies.userEmail;
    console.log('emailCookie:' + emailCookie);
    let userFromCookie = false
    if (typeof(emailCookie) != 'undefined'){
        console.log(typeof(emailCookie))
        userFromCookie = await db.User.findOne({where: {email:emailCookie}})
        
    }
    //Ahora lo tomo de BD
    // const usuarios = require ('../data/users.json');
    // const  userFromCookie =  usuarios.find (user => user.email === emailCookie);
    if (typeof(userFromCookie)!= 'undefined' && userFromCookie!= false) {
        let userAux = {};
        Object.assign (userAux, userFromCookie);
        userAux.password='';
        console.log('Aqui en middleware: cookie \n\n' + JSON.stringify(userAux))
        req.session.userLogged= userAux;
    }

    }

    if(req.session.userLogged) {
        console.log('User Session          ' + JSON.stringify(req.session.userLogged));
        res.locals.isLogged =true;
    };
    next();
}



module.exports = {isUserLoggedMiddleware};