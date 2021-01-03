const bookSchema = require('../models/bookSchema');
const bookService = require('../models/services/bookService');

const BOOKS_PER_PAGE = 12;

module.exports.products = async (req, res, next) => {
    const listRecommended = await bookService.get_recommended();

    const page = +req.query.page || 1;

    //const list_sort = await bookService.sort_price(sort);

    const paginate = await bookService.list(page, BOOKS_PER_PAGE);

    res.render('products', {
        title: 'List of Products',
        recommendedBook: listRecommended,
        book: paginate.docs,
        isFirstPage: paginate.page == 1,
        hasNextPage: paginate.hasNextPage,
        hasPrevPage: paginate.hasPrevPage,
        hasNextNextPage: paginate.nextPage != null && paginate.nextPage < paginate.totalPages,
        hasPrevPrevPage: paginate.prevPage > 1,
        page: paginate.page,
        nextPage: paginate.nextPage,
        prevPage: paginate.prevPage,
        nextNextPage: paginate.nextPage != null && paginate.nextPage < paginate.totalPages ? paginate.nextPage + 1 : null,
        prevPrevPage: paginate.prevPage > 1 ? paginate.prevPage - 1 : null,
        isLastPage: paginate.page == paginate.totalPages,
        totalPages: paginate.totalPages
        
    });
}

module.exports.detail = async (req, res) => {
    const book = await bookService.get(req.params.id);
    res.render('product_detail', {
        title: book.name,
        book: book
    });
}