class QuizController {
    constructor(csvParser, userService) {
        this.csvParser = csvParser;
        this.userService = userService;
    }

    async loadQuestions(req, res) {
        try {
            const questions = await this.csvParser.getQuestions();
            res.json(questions);
        } catch (error) {
            res.status(500).json({ message: 'Error loading questions' });
        }
    }

    checkAnswer(req, res) {
        const { questionId, userAnswer } = req.body;
        const correctAnswer = this.csvParser.getCorrectAnswer(questionId);

        if (userAnswer === correctAnswer) {
            res.json({ correct: true });
        } else {
            res.json({ correct: false, correctAnswer });
        }
    }

    async submitScore(req, res) {
        const { userId, score } = req.body;
        console.log('Received score submission:', { userId, score });

        try {
            await this.userService.updateUserScore(userId, score);
            res.status(201).json({ message: 'Score saved successfully' });
        } catch (error) {
            console.error('Error saving score:', error);
            res.status(500).json({ message: 'Error saving score' });
        }
    }

    async createUser(req, res) {
        const { name, surname, matriculation } = req.body;

        try {
            const userId = await this.userService.createUser(name, surname, matriculation);
            res.status(201).json({ userId });
        } catch (error) {
            res.status(500).json({ message: 'Error creating user' });
        }
    }
}

module.exports = QuizController;