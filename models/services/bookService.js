const BookModel = require('../bookSchema');
const categoryModel = require('../categorySchema');

const mongoose = require('mongoose');


exports.list = async (pageNum, booksPerPage) => {
    let books = await BookModel.paginate({}, {
        page: pageNum,
        limit: booksPerPage
    });
    return books;
}

exports.sort_list = async (pageNum, booksPerPage, sort_value) => {
    let books = await BookModel.paginate({}, {
        sort: {
            price: sort_value
        },
        page: pageNum,
        limit: booksPerPage
    });
    return books;
}

exports.category_list = async (pageNum, booksPerPage, category) => {
    let books = await BookModel.paginate({}, {
        select:{
            category: category
        },
        page: pageNum,
        limit: booksPerPage
    });
    return books;
}

exports.category_sort_list = async (pageNum, booksPerPage, sort_value, category) => {
    let books = await BookModel.paginate({}, {
        select:{
            category: category
        },
        sort: {
            price: sort_value
        },
        page: pageNum,
        limit: booksPerPage
    });
    return books;
}


exports.get = async (id) => {
    const book = await BookModel.findOne({ _id: new mongoose.Types.ObjectId(id)});
    return book;
}

exports.get_recommended = async (books_per_page) => {
    const books = await BookModel.find({}).limit(books_per_page);
    return books;
}
