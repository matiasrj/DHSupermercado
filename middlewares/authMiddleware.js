const authMiddleware  =  (req, res, next) => {

    // console.log('Auth Midd: ' + JSON.stringify( req.session.userLogged ))
    if (!req.session.userLogged){
        return res.redirect('/users/login');
    }
    next();
}



module.exports = {authMiddleware};