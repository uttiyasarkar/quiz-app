const mongoose = require('mongoose');

// Define the schema for storing user details and their score
const userSchema = new mongoose.Schema({
    name: String,
    surname: String,
    matriculation: String,
    score: Number, // Add the score field
    date: { type: Date, default: Date.now }
});

// Create the model
const User = mongoose.model('User', userSchema);

class UserService {
    async createUser(name, surname, matriculation) {
        const newUser = new User({ name, surname, matriculation });
        await newUser.save();
        return newUser._id;
    }

    async updateUserScore(userId, score) {
        console.log('Updating user score:', { userId, score });
        await User.findByIdAndUpdate(userId, { score });
    }
}

module.exports = UserService;