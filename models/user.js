const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Passport-Local Mongoose is a Mongoose plugin that simplifies building username and password login with Passport.
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        minLength: 3,
        maxLength: 30,
        lowercase: true,
        trim: true,
    },
    firstName: {
        type: String,
        required: true,
        maxLength: 50,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        maxLength: 50,
        trim: true,
    },
});

// Passport-Local Mongoose will add a username, hash and salt field to store the username, the hashed password and the salt value.
userSchema.plugin(passportLocalMongoose); 

module.exports = mongoose.model('User', userSchema);