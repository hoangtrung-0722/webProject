const bookService = require('../models/services/bookService');

module.exports.products = async (req, res, next) => {
    const listRecommended = await bookService.get_recommended();
    res.render('products', {
        title: 'List of Products',
        recommendedBook: listRecommended
    });
}

module.exports.detail = async (req, res) => {
    const book = await bookService.get(req.params.id);
    res.render('product_detail', {
        title: book.name,
        book: book
    });
}