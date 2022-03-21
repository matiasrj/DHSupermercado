const guestMiddleware  =  (req, res, next) => {

    // console.log('gest middleware: ' + req.session.userLogged);
    if (req.session.userLogged){
        return res.redirect('/products/')
    }
    next();
}



module.exports = {guestMiddleware};