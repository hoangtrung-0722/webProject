const mongoose = require('mongoose');

const receiptSchema = new mongoose.Schema ({
    userId: {type: mongoose.Types.ObjectId, ref: 'User'},
    products: [
        {
            productId: {type: mongoose.Types.ObjectId, ref: 'Book'},
            quantity: Number,
            price: Number
        }
    ],
    transportFee: Number,
    total: Number,
    destination: String,
    status: {type: String, default: 'not delivered'}
});

module.exports = mongoose.model('Receipt', receiptSchema);