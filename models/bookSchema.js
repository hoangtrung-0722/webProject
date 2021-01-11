const { ObjectID } = require('mongodb');
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const database = require('../dal/database');


const bookSchema = new mongoose.Schema ({
    name: String,
    label: String,
    images: Array,
    price: String,
    cover: String,
    description: String,
    category: ObjectID,
}, { collection: 'books' });

bookSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('BookModel', bookSchema);

