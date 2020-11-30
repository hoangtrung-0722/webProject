const bookModel = require('../models/bookModel');

module.exports.index = (req, res, next) => {
    const book = bookModel.list();
    res.render('index', {book});
};

module.exports.login = (req, res, next) => {
    res.render('login', {});
};

module.exports.register = (req, res, next) => {
    res.render('register', {});
};