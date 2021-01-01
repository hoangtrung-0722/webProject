const BookModel = require('../bookSchema');
const ObjectId = require('mongodb').ObjectID;

exports.list = async (pageNum, booksPerPage) => {
    let books = await BookModel.paginate({}, {
        page: pageNum,
        limit: booksPerPage
    });

    return books;
}

exports.get = async (id) => {
    const book = await BookModel.findOne({ _id: ObjectId(id) });
    return book;
}

exports.get_recommended = async () => {
    const books = await BookModel.find({}).limit(4);
    return books;
}