const bookSchema = require('../models/bookSchema');
const bookService = require('../models/services/bookService');

const BOOKS_PER_PAGE = 16;

module.exports.products = async (req, res, next) => {
    const listRecommended = await bookService.get_recommended();

    const page = +req.query.page || 1;

    const list_sort = await bookService.sort_price(sort);

    const paginate = await bookService.list(page, BOOKS_PER_PAGE);

    res.render('products', {
        title: 'List of Products',
        recommendedBook: listRecommended,
        book: paginate.docs,
        hasNextPage: paginate.hasNextPage,
        hasPrevPage: paginate.hasPrevPage,
        page: paginate.page,
        nextPage: paginate.nextPage,
        prevPage: paginate.prevPage,
        
    });
}

module.exports.detail = async (req, res) => {
    const book = await bookService.get(req.params.id);
    res.render('product_detail', {
        title: book.name,
        book: book
    });
}