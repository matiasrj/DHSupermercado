

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
        const userFromCookie = await db.User.findOne({where: {email:emailCookie}})
        console.log(userFromCookie)
    }
    //Ahora lo tomo de BD
    // const usuarios = require ('../data/users.json');
    // const  userFromCookie =  usuarios.find (user => user.email === emailCookie);
    if (userFromCookie) {
        let userAux = {};
        Object.assign (userAux, userFromCookie);
        userAux.password='';
        console.log('Aqui en middleware: cooqie' + JSON.stringify(userAux))
        req.session.userLogged= userAux;
        console.log('User Cookie:' + JSON.stringify(req.session.userLogged));
    }

    }

    if(req.session.userLogged) {
        console.log('User Session' + JSON.stringify(req.session.userLogged));
        res.locals.isLogged =true;
    };
    next();
}



module.exports = {isUserLoggedMiddleware};