const bookModel = require('../models/bookModel');

module.exports.index = async (req, res, next) =>{

    const books = await bookModel.getPage(req.params.page);
    const q = req.query.q;
    if(q){
        const filter_search = await bookModel.search(q);
        res.render('list_book', {
            book: filter_search.list,
            prevPage: filter_search.prevPage,
            currentPage: filter_search.currentPage,
            nextPage: filter_search.nextPage,
            totalPage: filter_search.totalPage
        });
    }
    
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