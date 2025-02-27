const express = require('express');
const path = require('path');
const QuizController = require('../controllers/quizController');
const CSVParser = require('../services/csvParser');
const UserService = require('../services/userService');

const router = express.Router();
const csvParser = new CSVParser('/Users/uttiyasarkar/Documents/LabCourse/export.csv');
const userService = new UserService();
const quizController = new QuizController(csvParser, userService);

// Define your routes here
router.get('/api/quiz', (req, res) => quizController.loadQuestions(req, res));
router.post('/api/quiz/answer', (req, res) => quizController.checkAnswer(req, res));
router.post('/api/quiz/score', (req, res) => quizController.submitScore(req, res));
router.post('/api/create-user', (req, res) => quizController.createUser(req, res));

// Route to render the main page
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});

module.exports = router;