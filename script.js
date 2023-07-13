const rock = document.querySelector("#rock"),
    paper = document.querySelector("#paper"),
    scissors = document.querySelector("#scissors"),
    options = document.querySelectorAll(".options > div"),
    scoreBoardHeading = document.querySelector(".score-board h2"),
    scoreBoardParagraph = document.querySelector(".score-board p"),
    playerScore = document.querySelector("#player .score"),
    computerScore = document.querySelector("#computer .score"),
    playerSelectedImg = document.querySelector("#player img"),
    computerSelectedImg = document.querySelector("#computer img"),
    footerYear = document.querySelector(".year"),
    finalButton = document.querySelector('#final-button'),
    finalResult = document.querySelector("#final-result"),
    finalRsultWindow = document.querySelector("#final-result-window");

    // --------------------Functions----------------------------------
// polyfil for sentence or word capitalization
function capitalize() {
    return this.toLowerCase().replace(/\b[a-z](?=[a-z]{2})/g, function (letter) {
        return letter.toUpperCase();
    });
}
String.prototype.toCapitalize = capitalize; // adding capitaliZe method to String object 

function getComputerChoice() {// fucntion for randam choice of computer
    return ['rock', 'paper', 'scissors'][Math.floor(Math.random() * 3)];
}

function playRound(playerSelection, computerSelection) {
    let youWin = 1,
        youLose = 0,
        draw = -1;

    switch (playerSelection) {
        case 'rock': switch (computerSelection) {
            case 'rock': return draw;
            case 'paper': return youLose;
            case 'scissors': return youWin;
        }

        case 'paper': switch (computerSelection) {
            case 'rock': return youWin;
            case 'paper': return draw;
            case 'scissors': return youLose;
        }
        case 'scissors': switch (computerSelection) {
            case 'rock': return youLose;
            case 'paper': return youWin;
            case 'scissors': return draw;
        }
    }
}
function popupToggle(element, replacingValue) {
    let elementDisplayValue = window.getComputedStyle(element).getPropertyValue('display');
    element.style.display = elementDisplayValue !== 'none' ? 'none' : replacingValue;
    // console.log(window.getComputedStyle(element).getPropertyValue('display'));
}

function winOrLose(element1, element2, result, text) {
    let buttonTexts = ["Play again", "It's a tie", "Try again"];
    element1.textContent = result == 1 ? "You Won!" : (result == -1 ? "It's a tie!" : "You Lost!");
    if (text)
        element2.textContent = text;
    else
        element2.textContent = result == 1 ? buttonTexts[0] : (result == -1 ? buttonTexts[1] : buttonTexts[2]);
}

function winOrLoseDisplay(wins, losses) {
    if (wins > losses)
        winOrLose(finalResult, finalButton, 1)
    else
        winOrLose(finalResult, finalButton, 0)

    popupToggle(finalRsultWindow, 'block');
}

function scoreUpdate() {
    playerScore.textContent = wins;
    computerScore.textContent = losses;
}

function resetGame() {
    wins = 0;
    losses = 0;
    scoreBoardHeading.textContent= "Choose your weapon";
    scoreBoardParagraph.textContent= "First 5 points scorer wins the game";
    playerSelectedImg.setAttribute('src', `./images/question-mark.gif`);
    computerSelectedImg.setAttribute('src', `./images/question-mark.gif`);
    scoreUpdate();
    popupToggle(finalRsultWindow, 'block');
}

    // ----------------------------Execution-------------------------------
footerYear.textContent = new Date().getFullYear();
var points_to_win = 5;
var wins = 0, losses = 0;

options.forEach(function (element) {
    element.addEventListener("click", function (event) {
        if ((wins == points_to_win) || (losses == points_to_win)) {
            winOrLoseDisplay(wins, losses);
            return;
        }
        // console.log(element.getAttribute('id'));
        let playerSelection = element.getAttribute('id');
        let computerSelection = getComputerChoice();
        let result = playRound(playerSelection, computerSelection);
        let youWin = `${playerSelection} beats ${computerSelection}`.toCapitalize(),
            youLose = `${computerSelection} beats ${playerSelection}`.toCapitalize(),
            tie = "Its a tie! You and computer choose the same";
        let pTexts = result == 1 ? youWin : (result == 0 ? youLose : tie);
        playerSelectedImg.setAttribute('src', `./images/${playerSelection}.gif`);
        computerSelectedImg.setAttribute('src', `./images/${computerSelection}.gif`);
        wins = result === 1 ? wins + 1 : wins;
        losses = result === 0 ? losses + 1 : losses;
        scoreUpdate();
        winOrLose(scoreBoardHeading, scoreBoardParagraph, result, pTexts);
    });

})

finalRsultWindow.addEventListener("click", function (event) {
    // console.log(event.target.classList[0] === 'popup-box');
    if (event.target.classList[0] === 'popup-box') popupToggle(finalRsultWindow, 'block');
});

finalButton.addEventListener("click", resetGame);

