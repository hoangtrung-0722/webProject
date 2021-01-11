const Category = require('../Category');
const Book = require('../Book');

const mongoose = require('mongoose');


exports.list = async (pageNum, booksPerPage) => {
    let books = await Book.paginate({}, {
        page: pageNum,
        limit: booksPerPage
    });
    return books;
}

exports.sort_list = async (pageNum, booksPerPage, sort_value) => {
    let books = await Book.paginate({}, {
        sort: {
            price: sort_value
        },
        page: pageNum,
        limit: booksPerPage
    });
    return books;
}

exports.category_list = async (pageNum, booksPerPage, category) => {
    let books = await Book.paginate({
        category: category
    }, {
        page: pageNum,
        limit: booksPerPage
    });
    return books;
}

exports.category_sort_list = async (pageNum, booksPerPage, sort_value, category) => {
    let books = await Book.paginate({
        category: category
    }, {
        sort: {
            price: sort_value
        },
        page: pageNum,
        limit: booksPerPage
    });
    return books;
}


exports.get = async (id) => {
    const book = await Book.findOne({ _id: new mongoose.Types.ObjectId(id)});
    console.log(book);
    return book;
}

exports.get_recommended = async (books_per_page) => {
    const books = await Book.find({}).limit(books_per_page);
    return books;
}
