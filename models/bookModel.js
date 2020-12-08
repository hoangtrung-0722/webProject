const {db} = require('../dal/database');
const { ObjectId} = require('mongodb');

const itemPerPage = 3;

const totalPage = async (filter) => {
    const booksCollection = db().collection('books');
    const totalDoc = await booksCollection.find(filter).count();
    console.log(totalDoc / itemPerPage + 1);
    return Math.floor(totalDoc / itemPerPage + 1);
}

exports.list = async () => {
    const booksCollection = db().collection('books');
    const books = await booksCollection.find({}).toArray();
    return books;
}

exports.get = async (id) => {
    const booksCollection = db().collection('books');
    const book = await booksCollection.findOne({_id: ObjectId(id)})
    return book;
}

exports.getPage = async (page) => {
    const pageNum = parseInt(page);
    const total = await totalPage({});
    const booksCollection = db().collection('books');
    const books =  await booksCollection.find()
                                        .skip(itemPerPage * (pageNum - 1))
                                        .limit(itemPerPage)
                                        .toArray();
    return {
        list: books,
        prevPage: pageNum > 1 ? pageNum - 1 : undefined,
        currentPage: pageNum,
        nextPage: pageNum < total ? pageNum + 1 : undefined,
        totalPage: total
    };
}