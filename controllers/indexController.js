const bookService = require('../models/services/bookService');

const BOOKS_PER_PAGE = 4;

module.exports.index = async (req, res, next) => {
    const listRecommended = await bookService.get_recommended();


    res.render('index', {
        title: 'Book Store',
        recommendedBook: listRecommended,
        
    });
}