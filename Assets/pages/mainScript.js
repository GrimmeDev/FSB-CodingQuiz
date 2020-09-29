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
        // console.log(userScoreLocal);
        localStorage.setItem("userScoreLocal", JSON.stringify(userScoreLocal));

        // once score input to local storage, load scores.html
        displayHighscores();
    });
};

function displayHighscores(){
    window.location.href="./Assets/pages/scores.html"
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