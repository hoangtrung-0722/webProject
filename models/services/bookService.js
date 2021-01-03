const BookModel = require('../bookSchema');
const mongoose = require('mongoose');


exports.list = async (pageNum, booksPerPage) => {
    const books = await BookModel.paginate({}, {
        page: pageNum,
        limit: booksPerPage
    });

    return books;
}

exports.get = async (id) => {
    const book = await BookModel.findOne({ _id: new mongoose.Types.ObjectId(id)});
    return book;
}

exports.get_recommended = async () => {
    const books = await BookModel.find({}).limit(4);
    return books;
}

exports.sort_price = async (sort) => {
    const books = await BookModel.find({}).sort({price: sort});
    return books;
}

