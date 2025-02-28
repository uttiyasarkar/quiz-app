const axios = require('axios');
const csv = require('csv-parser');
const { Readable } = require('stream');

class CSVParser {
    constructor(csvUrl) {
        this.csvUrl = csvUrl;
    }

    async getQuestions() {
        const questions = [];
        console.log(`Fetching CSV file from: ${this.csvUrl}`);

        try {
            const response = await axios.get(this.csvUrl);
            const data = response.data;

            return new Promise((resolve, reject) => {
                const stream = Readable.from(data);
                stream
                    .pipe(csv())
                    .on('data', (row) => {
                        questions.push(row);
                    })
                    .on('end', () => {
                        console.log('CSV file successfully processed');
                        resolve(questions);
                    })
                    .on('error', (error) => {
                        console.error('Error reading CSV file:', error);
                        reject(error);
                    });
            });
        } catch (error) {
            console.error('Error fetching CSV file:', error);
            throw error;
        }
    }
}

module.exports = CSVParser;