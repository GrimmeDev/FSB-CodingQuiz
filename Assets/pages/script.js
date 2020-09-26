// initial variable declaration to store positions of divs
var topText = document.getElementById("nonQuestions");
var questions = document.getElementById("Questions");
var mainDisplay = document.querySelector(".mainDisplay");
var timer = document.getElementById("Timer");
var answers = document.getElementById("answer");
var answerButtons = document.getElementById("buttons");
var startButton = document.getElementById("start");
var value = 0;

var quizIndex = 0;
var timeLeft = 75;

// object container question and correct answers
// format style = Question : Correct Answer
var quiz = [
    // "Arrays in JavaScript can store what type of information?": "All of the Above"
    Question1 = {
        question: "Arrays in JavaScript can store what type of information?",
        answer1: "All of the above",
        answer2: "Strings",
        answer3: "Numbers",
        answer4: "Other Arrays",
        correct: 1
    },
    Question2 = {
        question: "Something",
        answer1: "wrong",
        answer2: "right",
        answer3: "wrong",
        answer4: "wrong",
        correct: 2
    }
];

function displayQuestion(index) {
    mainDisplay.textContent = quiz[index].question;

    // create 4 buttons
    var answer1 = document.createElement("button");
    var answer2 = document.createElement("button");
    var answer3 = document.createElement("button");
    var answer4 = document.createElement("button");
    answer1.setAttribute("class", "button");
    answer2.setAttribute("class", "button");
    answer3.setAttribute("class", "button");
    answer4.setAttribute("class", "button");

    // append created elements
    answerButtons.appendChild(answer1);
    answerButtons.appendChild(answer2);
    answerButtons.appendChild(answer3);
    answerButtons.appendChild(answer4);

    // set button text
    answer1.textContent = quiz[index].answer1;
    answer2.textContent = quiz[index].answer2;
    answer3.textContent = quiz[index].answer3;
    answer4.textContent = quiz[index].answer4;

    answer1.addEventListener("click", determineAnswer(answer, index));
    answer2.addEventListener("click", determineAnswer(answer, index));
    answer3.addEventListener("click", determineAnswer(answer, index));
    answer4.addEventListener("click", determineAnswer(answer, index));
};

function determineAnswer(answer, index){


};

function startQuiz() {
    startButton.style.display = "none";
    // target timer with count variable
    timer.textContent = timeLeft;

    displayQuestion(quizIndex);

    var timerInterval = setInterval(function () {
        // seconds--;
        timeLeft--;
        // target timer with count variable
        timer.textContent = timeLeft;

        // once button is clicked, if answer is correct
        // display


        // if seconds = 0
        if (timeLeft == 0) {
            // clear function
            // disable answers if any are displayed
            // display high score submission block
        }
    }, 1000);
}

// event listeners
startButton.addEventListener("click", startQuiz);