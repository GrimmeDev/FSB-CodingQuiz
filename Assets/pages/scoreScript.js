//#region VariableDeclaration
var back = document.getElementById("back");
var clear = document.getElementById("clear");
var listDisplay = document.querySelector(".ScoreDisplay");

var userScoreLocal = JSON.parse(localStorage.getItem("userScoreLocal")) || [];
// console.log(userScoreLocal);
// console.log(userScoreLocal.length);
//#endregion

// Function to go back to main index page
function goHome() {
    window.location.href = "../../index.html"
}

// Function to clear local storage of all scores
function clearHS() {
    localStorage.clear();
    // empty generated list after clearing local storage
    displayScores();
}

// function to display all high scores on page
function displayScores() {
    for (var i = 0; i < userScoreLocal.length; i++) {
        var listItem = document.createElement("li");
        // userScore.name = userScoreLocal[i].name;
        // console.log(userScore.name);
        // userScore.score = userScoreLocal[i].score;
        // console.log(userScore.score);
        listItem.textContent = userScoreLocal[i].name + ": " + userScoreLocal[i].score;
        // listItem.textContent = userScore.name + " - " + userScore.score;
        listDisplay.appendChild(listItem);
    }
}

// event listeners
back.addEventListener("click", goHome);
clear.addEventListener("click", clearHS);
window.addEventListener("load", displayScores);