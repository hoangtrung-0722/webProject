const mongoose = require('mongoose');
const database = require('../dal/database');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema ({
    username: String,
    password: String
});

userSchema.plugin(passportLocalMongoose, {
    errorMessages: {
        UserExistsError: 'Username already exists'
    }
});

module.exports = mongoose.model('User', userSchema);