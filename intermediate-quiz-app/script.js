const questions = [
    {
        question: "Ibu kota Indonesia adalah?",
        options: [
            "Bandung",
            "Jakarta",
            "Medan",
            "Aceh"
        ],
        answer: "Jakarta"
    },

    {
        question: "2 + 2 = ?",
        options: [
            "3",
            "4",
            "5",
            "6"
        ],
        answer: "4"
    },

    {
        question: "Bahasa pemrograman web adalah?",
        options: [
            "JavaScript",
            "Photoshop",
            "Excel",
            "Word"
        ],
        answer: "JavaScript"
    }
];

let currentQuestionIndex = 0;
let score = 0;

let task = [];

const quizContainer = document.getElementById("quiz-container");

const startButton = document.getElementById("start-btn");
startButton.addEventListener("click", startQuiz);

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;

    showQuestion();
}

function showQuestion() {
    const question = questions[currentQuestionIndex];
    quizContainer.innerHTML = `
        <h2>${question.question}</h2>`;

    question.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.addEventListener("click", () => checkAnswer(option)
        );
        quizContainer.appendChild(button);
        }
    );     
}

function checkAnswer(selected) {
    const correctAnswer = questions[currentQuestionIndex].answer;
    const buttons = quizContainer.querySelectorAll("button");

    buttons.forEach(button => {
        button.disabled = true;

        if(button.textContent === correctAnswer) {
            button.classList.add("correct");
        }

        if(button.textContent === selected && selected !== correctAnswer) {
            button.classList.add("incorrect");
        }
    });

    if(selected === correctAnswer) {
        score++;
    }

    setTimeout(() => {
        currentQuestionIndex++;
        if(currentQuestionIndex < questions.length) {
            showQuestion();
        }
        else {
            showResult();
        }
    }, 1000);
}

function showResult() {
    quizContainer.innerHTML = `
        <h2>Quiz Selesai!</h2>
        <p>Skor Anda: ${score} dari ${questions.length}</p>
        <button id="restart-btn" onclick="startQuiz()" >Mulai Lagi</button>
    `;
}