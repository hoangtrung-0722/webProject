const bookModel = require('../models/bookModel');

module.exports.index = async (req, res, next) =>{

    const book = await bookModel.list();
    
    res.render('list_book', {book});
};

module.exports.detail = async (req, res) =>{
    console.log(req.params.id);
    const book = await bookModel.get(req.params.id);
    res.render('book_detail', {title: book.title, book});
};