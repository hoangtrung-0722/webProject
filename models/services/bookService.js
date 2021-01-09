const BookModel = require('../Book');
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


exports.get = async (id) => {
    const book = await BookModel.findOne({ _id: new mongoose.Types.ObjectId(id)});
    console.log(book);
    return book;
}

exports.get_recommended = async (books_per_page) => {
    const books = await BookModel.find({}).limit(books_per_page);
    return books;
}
