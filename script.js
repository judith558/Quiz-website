const questions = [
    {
        question: "Who is the father of Robotics?",
        choices: ["Isaac Asimov", "Albert Einstein", "Nikola Tesla", "Leonardo da Vinci"],
        correctAnswer: 0
    },
    {
        question: "What is the capital of France?",
        choices: ["London", "Berlin", "Paris", "Madrid"],
        correctAnswer: 2
    },
    {
        question: "Which planet is known as the Red Planet?",
        choices: ["Venus", "Mars", "Jupiter", "Saturn"],
        correctAnswer: 1
    },
    {
        question: "Who was the first President of the United States?",
        choices: ["Abraham Lincoln", "George Washington", "Thomas Jefferson", "John Adams"],
        correctAnswer: 1
    },
    {
        question: "What is the largest ocean on Earth?",
        choices: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        correctAnswer: 3
    },
    {
        question: "Which country won the FIFA World Cup in 2018?",
        choices: ["Germany", "Brazil", "France", "Argentina"],
        correctAnswer: 2
    },
    {
        question: "What does CPU stand for?",
        choices: ["Central Processing Unit", "Computer Personal Unit", "Central Program Unit", "Computer Processing Unit"],
        correctAnswer: 0
    },
    {
        question: "Who is known as the King of Pop?",
        choices: ["Elvis Presley", "Michael Jackson", "Prince", "Madonna"],
        correctAnswer: 1
    },
    {
        question: "In which year did World War II end?",
        choices: ["1944", "1945", "1946", "1947"],
        correctAnswer: 1
    },
];

const startMenu = document.getElementById("start-menu");
const quizContainer = document.getElementById("quiz-container");
const startButton = document.getElementById("start-btn");
const app = document.querySelector(".app");
const questionElement = document.querySelector(".quiz-text");
const choicesElement = document.getElementById("choices");
const submitButton = document.getElementById("submit-btn");
const scoreElement = document.getElementById("score");
const restartButton = document.getElementById("play-again");
const timerElement = document.querySelector(".time");

let currentQuestion = 0;
let score = 0;
let timeLeft = 30;
let timerInterval;

function loadQuestion() {
    console.log("loadQuestion called, currentQuestion:", currentQuestion);
    const question = questions[currentQuestion];
    console.log("Question:", question);
    console.log("questionElement:", questionElement);
    questionElement.innerText = question.question;

    choicesElement.innerHTML = "";
    for (let i = 0; i < question.choices.length; i++) {
        const li = document.createElement("li");
        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "choice";
        radio.value = i;
        li.appendChild(radio);
        li.appendChild(document.createTextNode(question.choices[i]));
        choicesElement.appendChild(li);
    }
    console.log("Choices loaded");
}

function checkAnswer() {
    const selectOption = document.querySelector('input[name="choice"]:checked');
    if (selectOption) {
        const selectedAnswer = parseInt(selectOption.value);
        const correctAnswer = questions[currentQuestion].correctAnswer;

        // Highlight the selected answer
        const selectedLi = selectOption.parentElement;
        if (selectedAnswer === correctAnswer) {
            selectedLi.classList.add('correct');
            score++;
        } else {
            selectedLi.classList.add('wrong');
            // Also highlight the correct answer
            const choices = document.querySelectorAll('#choices li');
            choices[correctAnswer].classList.add('correct');
        }

        // Disable all radio buttons
        const radios = document.querySelectorAll('input[name="choice"]');
        radios.forEach(radio => radio.disabled = true);

        // Wait 2 seconds before moving to next question
        setTimeout(() => {
            currentQuestion++;
            if (currentQuestion < questions.length) {
                loadQuestion();
            } else {
                showScore();
            }
        }, 2000);
    }
}

function showScore() {
    clearInterval(timerInterval);
    questionElement.style.display = "none";
    choicesElement.style.display = "none";
    submitButton.style.display = "none";
    scoreElement.innerText = `Your score: ${score}/${questions.length}`;
    restartButton.style.display = "block";
}

function updateTimer() {
    timeLeft--;
    const minutes = Math.floor(timeLeft / 30);
    let seconds = timeLeft % 30;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    timerElement.textContent = `${minutes}:${seconds}`;
    if (timeLeft <= 0) {
        showScore();
    }
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    timeLeft = 60;
    questionElement.style.display = "block";
    choicesElement.style.display = "block";
    submitButton.style.display = "block";
    scoreElement.innerText = "";
    restartButton.style.display = "none";
    loadQuestion();
    timerInterval = setInterval(updateTimer, 1000);
}

function startQuiz() {
    startMenu.style.display = "none";
    quizContainer.style.display = "block";
    loadQuestion();
    updateTimer(); // Set initial timer display
    timerInterval = setInterval(updateTimer, 1000);
}

startButton.addEventListener("click", startQuiz);
submitButton.addEventListener("click", checkAnswer);
restartButton.addEventListener("click", restartQuiz);
