const mongoose = require('mongoose');

// Define the schema for storing scores
const scoreSchema = new mongoose.Schema({
    userId: String,
    score: Number,
    date: { type: Date, default: Date.now }
});

// Create the model
const Score = mongoose.model('Score', scoreSchema);

class ScoreService {
    async saveScore(userId, score) {
        const newScore = new Score({ userId, score });
        await newScore.save();
    }

    async getScores() {
        return await Score.find();
    }
}

module.exports = ScoreService;