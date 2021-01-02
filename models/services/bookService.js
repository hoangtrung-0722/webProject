const BookModel = require('../bookSchema');
const mongoose = require('mongoose');


exports.list = async () => {
    const books = await BookModel.find({});
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