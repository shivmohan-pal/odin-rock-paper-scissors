function capitalize() { // for  cpaitalizing the words
    return this.toLowerCase().replace(/\b[a-z](?=[a-z]{2})/g, function (letter) {
        return letter.toUpperCase();
    });
}

String.prototype.toCapitalize = capitalize; // adding capitalixe method to String object 

function getComputerChoice() {// fucntion for randam choice of computer
    return ['rock', 'paper', 'scissors'][Math.floor(Math.random() * 3)];
}

function playRound(playerSelection, computerSelection) {
    // your code here!
    let youWin = `You Win! \n${playerSelection} beats ${computerSelection}`.toCapitalize(),
        youLose = `You Lose! \n${computerSelection} beats ${playerSelection}`.toCapitalize(),
        draw = "Its a tie! You and computer choose the same";

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

function game(rounds) { // parameter taken for no of round to be conducted
    let wins = 0,losses =0;  
    for (let i = 0; i < rounds; i++) {
        let computerSelection = getComputerChoice();
        let playerSelection = prompt(`\n\t\t\t\t\t\t\t\t\t\t Rock Paper Scissors \t\t\t\t\t\t\t\t\t\t \n\n\tYou VS Computer - ( Round - ${i + 1} )\n\nEnter your attack ( rock | paper | scissors )`).toLowerCase();
        let result = playRound(playerSelection, computerSelection);
        wins = result[4]==='W'?  wins+1: wins;
        losses = result[4] === 'L'? losses+1: losses; 
        console.log(`%c${result}`, `color: ${result[4] === 'W' ? 'green' : (result[4] === 'L' ? 'red' : 'White')}; font-size: 14px`);
    }
    return wins>=losses ? (wins>losses?"You Won the Game": 'Game Draw! try agian') : "You Lost the Game"  
}

const finalRsult = game(5); // fucntion call
console.log(`%c>> ${finalRsult} <<`, `color: ${finalRsult[4] === 'W' ? 'green' : (finalRsult[4] === 'L' ? 'red' : 'White')}; font-size: 18px;text-shadow: 2px 0px 2px rgb(255,255,255);font-weight: bold;font-family:monospace`); 

