const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

const questions = [
    {
        question: "What is a computer?",
        answers: [
            { text: "A type of animal", correct: false },
            { text: "A machine that processes information", correct: true },
            { text: "A kind of plant", correct: false },
            { text: "A musical instrument", correct: false }
        ]
    },
    {
        question: "Which of the following can a computer do?",
        answers: [
            { text: "Cook food", correct: false },
            { text: "Fly in the sky", correct: false },
            { text: "Solve math problems", correct: true },
            { text: "Grow plants", correct: false }
        ]
    },
    {
        question: "What is the part of the computer that shows the display or screen?",
        answers: [
            { text: "Keyboard", correct: false },
            { text: "Monitor", correct: true },
            { text: "Mouse", correct: false },
            { text: "Printer", correct: false }
        ]
    },
    {
        question: "Which part of the computer is used to type words and numbers?",
        answers: [
            { text: "Monitor", correct: false },
            { text: "Keyboard", correct: true },
            { text: "Mouse", correct: false },
            { text: "CPU", correct: false }
        ]
    },
    {
        question: "What part of the computer is used to click and select things on the screen?",
        answers: [
            { text: "Mouse", correct: true },
            { text: "Keyboard", correct: false },
            { text: "Monitor", correct: false },
            { text: "Speaker", correct: false }
        ]
    },
    {
        question: "Which of the following is a way computers are used in schools?",
        answers: [
            { text: "To play sports", correct: false },
            { text: "To help students learn", correct: true },
            { text: "To paint walls", correct: false },
            { text: "To cook food", correct: false }
        ]
    },
    {
        question: "How are computers used in entertainment?",
        answers: [
            { text: "To clean houses", correct: false },
            { text: "To play games, watch movies, and listen to music", correct: true },
            { text: "To drive cars", correct: false },
            { text: "To repair bikes", correct: false }
        ]
    },
    {
        question: "How do people use computers for communication?",
        answers: [
            { text: "To talk with friends and family online", correct: true },
            { text: "To plant trees", correct: false },
            { text: "To build houses", correct: false },
            { text: "To repair machines", correct: false }
        ]
    }
];

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btns");
        answerButtons.appendChild(button);
        button.addEventListener("click", selectAnswer);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Restart";
    nextButton.style.display = "block";
    nextButton.addEventListener("click", startQuiz);
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        nextQuestion();
    } else {
        startQuiz();
    }
});

startQuiz();
