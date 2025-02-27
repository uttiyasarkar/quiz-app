# Quiz Application

This project is a web-based quiz application that allows users to take quizzes based on questions extracted from a CSV file. The application provides immediate feedback on user answers and stores final scores in a database.

## Features

- User-friendly interface for taking quizzes
- Immediate feedback on answers
- Score tracking and storage
- Dynamic question loading from a CSV file

## Project Structure

```
quiz-app
├── public
│   ├── index.html        # Main HTML structure for the quiz application
│   ├── styles.css       # Styles for the quiz application
│   └── scripts.js       # JavaScript for handling user interactions
├── src
│   ├── app.js           # Initializes the Express application
│   ├── controllers
│   │   └── quizController.js  # Handles quiz logic
│   ├── models
│   │   └── score.js     # Model for storing quiz scores
│   ├── routes
│   │   └── quizRoutes.js # Sets up routes for the quiz application
│   ├── services
│   │   └── csvParser.js  # Parses CSV file containing quiz questions
│   └── views
│       └── quiz.ejs     # EJS template for rendering the quiz interface
├── package.json          # Configuration file for npm
├── .env                  # Environment variables for the application
├── .gitignore            # Specifies files to be ignored by Git
├── README.md             # Documentation for the project
└── server.js             # Entry point for the server
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd quiz-app
   ```
3. Install the dependencies:
   ```
   npm install
   ```
4. Set up your environment variables in the `.env` file.

## Usage

1. Start the server:
   ```
   node server.js
   ```
2. Open your web browser and navigate to `http://localhost:3000` to access the quiz application.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License.