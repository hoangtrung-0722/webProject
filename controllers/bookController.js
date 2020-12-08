const bookModel = require('../models/bookModel');

module.exports.index = async (req, res, next) =>{

    const books = await bookModel.getPage(req.params.page);
    
    res.render('list_book', {
        book: books.list,
        prevPage: books.prevPage,
        currentPage: books.currentPage,
        nextPage: books.nextPage,
        totalPage: books.totalPage
    });
};

module.exports.detail = async (req, res) =>{
    const book = await bookModel.get(req.params.id);
    res.render('book_detail', {title: book.title, book});
};