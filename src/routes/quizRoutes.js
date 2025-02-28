const express = require('express');
const path = require('path');
const QuizController = require('../controllers/quizController');
const CSVParser = require('../services/csvParser');
const UserService = require('../services/userService');

const router = express.Router();
const csvParser = new CSVParser('https://raw.githubusercontent.com/uttiyasarkar/quiz-app/refs/heads/master/src/export.csv'); // Update the URL to the CSV file
const userService = new UserService();
const quizController = new QuizController(csvParser, userService);

// Define your routes here
router.get('/api/quiz', (req, res) => {
    console.log('Loading questions...');
    quizController.loadQuestions(req, res);
});
router.post('/api/quiz/answer', (req, res) => {
    console.log('Checking answer...');
    quizController.checkAnswer(req, res);
});
router.post('/api/quiz/score', (req, res) => {
    console.log('Submitting score...');
    quizController.submitScore(req, res);
});
router.post('/api/create-user', async (req, res) => {
    console.log('Creating user...');
    try {
        const user = await quizController.createUser(req, res);
        res.status(201).json(user);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Failed to create user' });
    }
});

// Route to render the main page
router.get('/', (req, res) => {
    console.log('Rendering main page...');
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});

module.exports = router;