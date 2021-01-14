const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');


const bookSchema = new mongoose.Schema ({
    name: String,
    images: [String],
    price: Number,
    sale: {type: Number, default: 0},
    cover: String,
    description: String,
    category: {type: mongoose.Types.ObjectId, ref: 'Category'},
    comments: [{
        user: String,
        body: String
    }]
});

bookSchema.virtual('sale-price').get(function() {
    return (this.price * (100 - this.sale) / 100).toFixed(2);
})

bookSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Book', bookSchema);
