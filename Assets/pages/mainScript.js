// initial variable declaration to store positions of divs
//#region VariableDeclaration
var topText = document.getElementById("nonQuestions");
var scoresPage = document.getElementById("scores");
var mainDisplay = document.querySelector(".mainDisplay");
var timer = document.getElementById("Timer");
var answers = document.getElementById("answer");
var answerButtons = document.getElementById("buttons");
var lineBreak = document.getElementById("break");
var startButton = document.getElementById("start");
var viewScores = document.getElementById("highscores");

var value = 0;
var quizIndex = 0;
var timeLeft = 75;
var quizFinished = false;

// attempt to pull from storage, if not found create empty array
var userScoreLocal = JSON.parse(localStorage.getItem("userScoreLocal")) || [];
// console.log(userScoreLocal);

// userScore object to contain submitted name and score
var userScore = {
    name: "",
    score: 0,
};

// object container question and correct answers
// format style = Question : Correct Answer
var quiz = [
    // "Arrays in JavaScript can store what type of information?": "All of the Above"
    Question1 = {
        question: "Arrays in JavaScript can store what type of information?",
        answer1: "Other Arrays",
        answer2: "Strings",
        answer3: "Numbers",
        answer4: "All of the above",
        correct: "4"
    },
    Question2 = {
        question: "A string needs to be wrapped in what?",
        answer1: "Single Quotes",
        answer2: "Double Quotes",
        answer3: "Curly Brackets",
        answer4: "Exclamation Points",
        correct: "2"
    },
    Question3 = {
        question: "When doing a boolean comparison for a generic value, you need to do 2 symbols of what?",
        answer1: "||",
        answer2: "&&",
        answer3: "==",
        answer4: "===",
        correct: "3"
    },
    Question4 = {
        question: "When doing an if statement, the correct order is what?",
        answer1: "else/if",
        answer2: "if/if/else",
        answer3: "else if/if",
        answer4: "if/else if/else",
        correct: "4"
    },
    Question5 = {
        question: "The logical operand of '&&' stands for what?",
        answer1: "Or",
        answer2: "And",
        answer3: "Not",
        answer4: "Modelo",
        correct: "2"
    },
    Question6 = {
        question: "A function always needs to be followed immediately with what?",
        answer1: "Square Brackets",
        answer2: "Angle Brackets",
        answer3: "Parenthesis",
        answer4: "An argument",
        correct: "3"
    },
    Question7 = {
        question: "To create an event on a specific element, the command is what? (Vanilla JavaScript)",
        answer1: ".addEventListener",
        answer2: ".click",
        answer3: ".on",
        answer4: ".listen",
        correct: "1"
    },
    Question8 = {
        question: "An object in javascript needs to be wrapped with what?",
        answer1: "Parenthesis",
        answer2: "Curly Brackets",
        answer3: "Square Brackets",
        answer4: "Angle Brackets",
        correct: "2"
    },
    Question9 = {
        question: "A number value, not a string value, needs to be wrapped with what?",
        answer1: "Nothing",
        answer2: "Single Quotes",
        answer3: "Double Quotes",
        answer4: "Angle Brackets",
        correct: "1"
    },
    Question10 = {
        question: "To edit the text of an element in Vanilla JavaScript, you need to use which function?",
        answer1: ".text",
        answer2: ".value",
        answer3: ".setAttribute()",
        answer4: ".textContent",
        correct: "4"
    }
];
// #endregion

function displayQuestion(index) {
    if (index >= quiz.length) {
        // alert("No more questions.");
        // call scores page
        quizFinished = true;
    }
    else {
        mainDisplay.textContent = quiz[index].question;

        // create 4 buttons
        for (var i = 0; i < 4; i++) {
            var answer = document.createElement("button");
            answer.setAttribute("class", "btn btn-primary m-1");
            // used to do a comparison of ID value with the object property of correct
            answer.setAttribute("id", (i + 1).toString());
            if (i == 0)
                answer.textContent = quiz[index].answer1;
            else if (i == 1)
                answer.textContent = quiz[index].answer2;
            else if (i == 2)
                answer.textContent = quiz[index].answer3;
            else
                answer.textContent = quiz[index].answer4;
            answerButtons.appendChild(answer);
            // answerButtons.appendChild(document.createElement("br"));
        }
    }
};

// function used to redraw all quiz items as well as update quizIndex
// will also delete previously created buttons
function redrawQuiz(quizIndex) {
    quizIndex++;
    clearButtons();
    displayQuestion(quizIndex);
    answerChecking(quizIndex);
};

function clearButtons() {
    answerButtons.innerHTML = '';
};

function answerChecking(quizIndex) {
    var allAnswers = document.querySelectorAll("button");
    // console.log("Found " + allAnswers.length + " buttons.");
    for (var i = 0; i < allAnswers.length; i++) {
        allAnswers[i].addEventListener("click", function () {
            // testing to determine which button was clicked
            // console.clear();
            // console.log("Correct answer: " + quiz[quizIndex].correct);
            // console.log("You clicked: ", this.innerHTML);
            // console.log(this.id);
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

function inputScore() {
    // enables High Scores title
    scoresPage.setAttribute("class", "visible");
    // clears buttons from last question answered OR if time ran out
    clearButtons();

    // clears text below input field
    lineBreak.setAttribute("class", "invisible");
    answers.setAttribute("class", "invisible");

    if (timeLeft == 0)
        mainDisplay.textContent = "You have run out of time. Your score is " + timeLeft.toString();
    else
        mainDisplay.textContent = "You have finished all the questions. Your score is " + timeLeft.toString();

    // create input box
    var inputName = document.createElement("input");
    inputName.setAttribute("class", "form-control form-text");
    inputName.setAttribute("placeholder", "Enter your name or initials...");

    // create submit button
    var submitScore = document.createElement("button");
    submitScore.setAttribute("class", "ml- 2 btn btn-primary");
    submitScore.textContent = "Submit Score";

    answerButtons.appendChild(inputName);
    answerButtons.appendChild(submitScore);

    // event listenter to submit new score
    submitScore.addEventListener("click", function () {
        // stores information into an object
        userScore.name = inputName.value;
        userScore.score = timeLeft;

        //#region ScoreCompare - NOT FUNCTIONAL
        // if (userScoreLocal.length > 0) {
        //     for (var i of userScoreLocal) {
        //         if (i.name == userScore.name) {
        //             console.log("Found");
        //             // updates score if same name found
        //             i.score = userScore.score;
        //             break;
        //         }
        //         else {
        //             console.log("Not Found");
        //             userScoreLocal.push(userScore);
        //         }
        //     }
        // }
        // else
        //#endregion
        userScoreLocal.push(userScore);
        userScoreLocal.sort(compare);
        // console.log(userScoreLocal);
        localStorage.setItem("userScoreLocal", JSON.stringify(userScoreLocal));

        // once score input to local storage, load scores.html
        displayHighscores();
    });
};

function compare(a, b) {
    const scoreA = a.score;
    const scoreB = b.score;

    let comparison = 0;
    if (scoreA > scoreB)
        comparison = 1;
    else if (scoreB > scoreA)
        comparison = -1;
    return comparison * -1;
};

function displayHighscores() {
    window.location.href = "./Assets/pages/scores.html"
}

function startQuiz() {
    startButton.parentNode.removeChild(startButton);
    // target timer with count variable
    timer.textContent = timeLeft;

    // display first question and prepare buttons for answer validation
    displayQuestion(quizIndex);
    answerChecking(quizIndex);

    var timerInterval = setInterval(function () {
        // seconds--;
        timeLeft--;
        // target timer with count variable
        timer.textContent = timeLeft;

        // if seconds = 0
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            // alert("Time ran out. Quiz over.");
            // call scores page
            inputScore();
        }
        else if (quizFinished) {
            // call score page
            clearInterval(timerInterval);
            inputScore();
        }
    }, 1000);
};

// event listeners
startButton.addEventListener("click", startQuiz);
viewScores.addEventListener("click", displayHighscores);