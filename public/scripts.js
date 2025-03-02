document.addEventListener('DOMContentLoaded', () => {
    const userForm = document.getElementById('user-form');
    const quizContainer = document.getElementById('quiz');
    const questionElement = document.getElementById('question');
    const answersElement = document.getElementById('answers');
    const submitBtn = document.getElementById('submit-btn');
    const nextBtn = document.getElementById('next-btn');
    const feedbackElement = document.getElementById('feedback');
    const scoreElement = document.getElementById('score');

    let questions = [];
    let currentQuestionIndex = 0;
    let score = 0;
    let userId = '';

    // Event listener for the user form submission
    userForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        console.log('User form submitted');

        const name = document.getElementById('name').value;
        const surname = document.getElementById('surname').value;
        const matriculation = document.getElementById('matriculation').value;

        try {
            console.log('Creating user with data:', { name, surname, matriculation });

            // Create user entry in the database
            const response = await fetch('/api/create-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, surname, matriculation })
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Failed to create user:', errorText);
                throw new Error('Failed to create user');
            }

            const data = await response.json();
            userId = data._id; // Ensure the correct field is used
            console.log('User created with ID:', userId);

            // Hide user form and show quiz container
            document.getElementById('user-details').style.display = 'none';
            quizContainer.style.display = 'block';

            // Fetch questions
            const questionsResponse = await fetch('/api/quiz');
            if (!questionsResponse.ok) {
                const errorText = await questionsResponse.text();
                console.error('Failed to fetch questions:', errorText);
                throw new Error('Failed to fetch questions');
            }

            questions = await questionsResponse.json();
            console.log('Questions loaded:', questions);

            // Display the first question
            displayQuestion();
        } catch (error) {
            console.error('Error:', error);
            feedbackElement.textContent = 'An error occurred. Please try again.';
        }
    });

    // Event listener for the submit button
    submitBtn.addEventListener('click', () => {
        const selectedAnswer = document.querySelector('input[name="answer"]:checked');
        if (!selectedAnswer) {
            feedbackElement.textContent = 'Please select an answer.';
            return;
        }

        const userAnswer = selectedAnswer.value;
        const correctAnswer = questions[currentQuestionIndex].CorrectAnswer;

        if (userAnswer === correctAnswer) {
            score++;
            feedbackElement.textContent = 'Correct!';
            feedbackElement.classList.add('correct');
            feedbackElement.classList.remove('wrong');
        } else {
            feedbackElement.textContent = `Wrong! The correct answer is: ${correctAnswer}`;
            feedbackElement.classList.add('wrong');
            feedbackElement.classList.remove('correct');
        }

        submitBtn.style.display = 'none';
        nextBtn.style.display = 'block';
    });

    // Event listener for the next button
    nextBtn.addEventListener('click', () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            displayQuestion();
        } else {
            submitScore();
        }
    });

    // Function to display the current question
    function displayQuestion() {
        feedbackElement.textContent = ''; // Clear feedback
        submitBtn.style.display = 'block';
        nextBtn.style.display = 'none';

        const question = questions[currentQuestionIndex];
        questionElement.textContent = question['Question Text'];
        answersElement.innerHTML = '';

        const answers = [
            question.CorrectAnswer,
            question.WrongAnswer1,
            question.WrongAnswer2,
            question.WrongAnswer3,
            question.WrongAnswer4,
            question.WrongAnswer5
        ].filter(answer => answer);

        // Ensure at least 4 options are displayed
        while (answers.length < 5) {
            answers.push(''); // Add empty strings to ensure at least 4 options
        }

        // Ensure the correct answer is always included
        const shuffledAnswers = shuffleArray(answers);
        const selectedAnswers = shuffledAnswers.slice(0, 3);
        if (!selectedAnswers.includes(question.CorrectAnswer)) {
            selectedAnswers.push(question.CorrectAnswer);
        }

        // Shuffle the selected answers again to randomize their order
        const finalAnswers = shuffleArray(selectedAnswers);

        finalAnswers.forEach(answer => {
            const label = document.createElement('label');
            const input = document.createElement('input');
            input.type = 'radio';
            input.name = 'answer';
            input.value = answer;
            label.appendChild(input);
            label.appendChild(document.createTextNode(answer));
            answersElement.appendChild(label);
        });
    }

    // Function to shuffle an array
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Function to submit the score
    async function submitScore() {
        try {
            console.log('Submitting score:', { userId, score });
            const response = await fetch('/api/quiz/score', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId, score })
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Failed to submit score:', errorText);
                throw new Error('Failed to submit score');
            }

            feedbackElement.textContent = 'Quiz completed!';
            scoreElement.textContent = `Your score: ${score}`;
            scoreElement.classList.add('score');
        } catch (error) {
            console.error('Error submitting score:', error);
            feedbackElement.textContent = 'An error occurred while submitting your score. Please try again.';
        }
    }
});