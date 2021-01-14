const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema ({
    userId: {type: mongoose.Types.ObjectId, ref: 'User'},
    products: [
        {
            productId: {type: mongoose.Types.ObjectId, ref: 'Book'},
            quantity: Number
        }
    ]
});

module.exports = mongoose.model('Cart', cartSchema);