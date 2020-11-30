const bookModel = require('../models/bookModel');

module.exports.index = async (req, res, next) =>{

    const book = await bookModel.list();
    
    res.render('list_book', {book});
};

module.exports.detail = async (req, res) =>{
    res.render('book_detail', await bookModel.get(req.params.id));
};