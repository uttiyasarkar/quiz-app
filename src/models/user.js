const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    matriculation: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;