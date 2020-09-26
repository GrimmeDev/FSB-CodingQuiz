// initial variable declaration to store positions of divs
var topText = document.getElementById("nonQuestions");
var questions = document.getElementById("Questions");
var mainDisplay = document.querySelector(".mainDisplay");
var timer = document.getElementById("Timer");
var answers = document.getElementById("answer");
var answerButtons = document.getElementById("buttons");
var lineBreak = document.getElementById("break");
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
        correct: "1"
    },
    Question2 = {
        question: "Something",
        answer1: "wrong",
        answer2: "right",
        answer3: "wrong",
        answer4: "wrong",
        correct: "2"
    },
    Question3 = {
        question: "Help me",
        answer1: "wrong",
        answer2: "wrong",
        answer3: "right",
        answer4: "wrong",
        correct: "3"
    },
    Question4 = {
        question: "Help me",
        answer1: "wrong",
        answer2: "wrong",
        answer3: "right",
        answer4: "wrong",
        correct: "3"
    },
    Question5 = {
        question: "Help me",
        answer1: "wrong",
        answer2: "wrong",
        answer3: "right",
        answer4: "wrong",
        correct: "3"
    },
    Question6 = {
        question: "Help me",
        answer1: "wrong",
        answer2: "wrong",
        answer3: "right",
        answer4: "wrong",
        correct: "3"
    },
    Question7 = {
        question: "Help me",
        answer1: "wrong",
        answer2: "wrong",
        answer3: "right",
        answer4: "wrong",
        correct: "3"
    },
    Question8 = {
        question: "Help me",
        answer1: "wrong",
        answer2: "wrong",
        answer3: "right",
        answer4: "wrong",
        correct: "3"
    },
    Question9 = {
        question: "Help me",
        answer1: "wrong",
        answer2: "wrong",
        answer3: "right",
        answer4: "wrong",
        correct: "3"
    },
    Question10 = {
        question: "Help me",
        answer1: "wrong",
        answer2: "wrong",
        answer3: "right",
        answer4: "wrong",
        correct: "3"
    }
];

function displayQuestion(index) {
    if (index >= quiz.length) {
        alert("No more questions.");
    }
    else {
        mainDisplay.textContent = quiz[index].question;

        // create 4 buttons
        var answer = document.createElement("button");
        answer.setAttribute("class", "button");
        answer.setAttribute("id", "1");
        answer.textContent = quiz[index].answer1;
        answerButtons.appendChild(answer);

        answer = document.createElement("button");
        answer.setAttribute("class", "button");
        answer.setAttribute("id", "2");
        answer.textContent = quiz[index].answer2;
        answerButtons.appendChild(answer);

        answer = document.createElement("button");
        answer.setAttribute("class", "button");
        answer.setAttribute("id", "3");
        answer.textContent = quiz[index].answer3;
        answerButtons.appendChild(answer);

        answer = document.createElement("button");
        answer.setAttribute("class", "button");
        answer.setAttribute("id", "4");
        answer.textContent = quiz[index].answer4;
        answerButtons.appendChild(answer);
    }
};

// function used to redraw all quiz items as well as update quizIndex
// will also delete previously created buttons
function redrawQuiz(quizIndex) {
    quizIndex++;
    answerButtons.innerHTML = '';
    displayQuestion(quizIndex);
    answerChecking(quizIndex);
};

function answerChecking(quizIndex) {
    var allAnswers = document.querySelectorAll("button");
    // console.log("Found " + allAnswers.length + " buttons.");
    for (var i = 0; i < allAnswers.length; i++) {
        allAnswers[i].addEventListener("click", function () {
            // testing to determine which button was clicked
            console.clear();
            console.log("Correct answer: " + quiz[quizIndex].correct);
            console.log("You clicked: ", this.innerHTML);
            console.log(this.id);
            if (this.id === quiz[quizIndex].correct) {
                // console.log("Correct!");
                redrawQuiz(quizIndex);
                lineBreak.setAttribute("class", "visible font-weight-light text-break");
                answers.setAttribute("class", "visible font-weight-light font-italic");
                answers.textContent = "Correct!";
            }
            else {
                // console.log("Wrong");
                timeLeft -= 10;
                redrawQuiz(quizIndex);
                lineBreak.setAttribute("class", "visible font-weight-light text-break");
                answers.setAttribute("class", "visible font-weight-light font-italic");
                answers.textContent = "Wrong!";
            }
        })
    }
};

function startQuiz() {
    startButton.parentNode.removeChild(startButton);
    // target timer with count variable
    timer.textContent = timeLeft;

    // display first question
    displayQuestion(quizIndex);
    answerChecking(quizIndex);

    var timerInterval = setInterval(function () {
        // seconds--;
        timeLeft--;
        // target timer with count variable
        timer.textContent = timeLeft;

        // once button is clicked, if answer is correct
        // display


        // if seconds = 0
        if (timeLeft == 0) {
            clearInterval(timerInterval);
            // alert("Time ran out. Quiz over.");
        }
    }, 1000);
}

// event listeners
startButton.addEventListener("click", startQuiz);