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
            console.error('Error loading questions:', error);
            res.status(500).json({ error: 'Failed to load questions' });
        }
    }

    async checkAnswer(req, res) {
        // Implement your logic here
    }

    async submitScore(req, res) {
        // Implement your logic here
    }

    async createUser(req, res) {
        try {
            const { name, surname, matriculation } = req.body;
            const user = await this.userService.createUser({ name, surname, matriculation });
            return user;
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }
}

module.exports = QuizController;