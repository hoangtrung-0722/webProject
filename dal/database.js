const mongoose = require('mongoose');

const uri = process.env.DB_URI;

async function connectDB() {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('mongoose connected');

    mongoose.connection.on('connected', function(){
        console.log('Mongoose connection success');
    });

    mongoose.connection.on('error', err => {
        console.error(err);
    });
}

module.exports = connectDB();
