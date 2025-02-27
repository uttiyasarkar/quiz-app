const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

class CSVParser {
    constructor(filePath) {
        this.filePath = filePath;
    }

    async getQuestions() {
        return new Promise((resolve, reject) => {
            const questions = [];
            fs.createReadStream(this.filePath)
                .pipe(csv())
                .on('data', (row) => {
                    questions.push(row);
                })
                .on('end', () => {
                    console.log('CSV file successfully processed');
                    console.log('Questions:', questions); // Add logging here
                    resolve(questions);
                })
                .on('error', (error) => {
                    console.error('Error reading CSV file:', error); // Add logging here
                    reject(error);
                });
        });
    }

    getCorrectAnswer(questionId) {
        // Implement logic to get the correct answer for a given questionId
    }
}

module.exports = CSVParser;