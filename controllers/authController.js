const User = require('../models/User');     

module.exports.openLogin = async (req, res, next) => {
    res.render('auth/login', { title: 'Login' });
}

module.exports.openLogin = async (req, res, next) => {
    res.render('auth/login', { title: 'Login' });
}

module.exports.openRegister = (req, res, next) => {
    res.render('auth/register', {title: 'Register'});
}

module.exports.registerUser = (req, res, next) => {
    User.register({ username: req.body.username, active: false }, req.body.password, function (err, user) {
        if (err) {
            return console.log(err);
        }

        var authenticate = User.authenticate();
        authenticate(req.body.username, req.body.password, function (err, result) {
            if (err) {
                console.log(err);
            }
            else {
                res.redirect('/index');
            }
        });
    });
}