const {db} = require('../dal/database');
const { ObjectId} = require('mongodb');

exports.list = async () => {
    const booksCollection = db().collection('books');
    const books = await booksCollection.find({}).toArray();
    return books;
}

exports.get = async (id) => {
    const booksCollection = db().collection('books');
    console.log(id);
    const book = await booksCollection.findOne({_id: ObjectId(id)})
    return book;
}
