//#region VariableDeclaration
var home = document.getElementById("mainPaige");
var back = document.getElementById("back");
var clear = document.getElementById("clear");
//#endregion

// Function to go back to main index page
function goHome(){
    window.location.href="index.html"
}

// Function to clear local storage of all scores
function clearHS(){
    localStorage.clear();
    // empty generated list after clearing local storage
}





// event listeners
home.addEventListener("click", goHome);
back.addEventListener("click", goHome);