
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyB44AQKuZ_72ZAiDCljF6hMIl9nR82lSkE",
    authDomain: "pixelquest-c8640.firebaseapp.com",
    databaseURL: "https://pixelquest-c8640.firebaseio.com",
    projectId: "pixelquest-c8640",
    storageBucket: "",
    messagingSenderId: "697551197080"
  };
  firebase.initializeApp(config);



var newGameBtn = document.getElementById('js-newGameButton');

newGameBtn.addEventListener('click', newGame);

var pickPlayer1 = document.getElementById('js-Player1'),
    pickPlayer2 = document.getElementById('js-Player2'),
    pickJudge = document.getElementById('js-Judge');

pickPlayer1.addEventListener('click', function() { 
    playerPick('Player1')
});
pickPlayer2.addEventListener('click', function() { 
    playerPick('Player2')
});
pickJudge.addEventListener('click', function() {
    playerPick('Judge') 
});

var gameState = 'notStarted'
    player = {
        name: '',
        score: 0
    },
    computer = {
        score: 0
    };

var newGameElem = document.getElementById('js-newGameElement'),
    pickElem = document.getElementById('js-playerPickElement'),
    resultsElem = document.getElementById('js-resultsTableElement');

function setGameElements() {
    switch(gameState) {
        case 'started':
                newGameElem.style.display = 'none';
                pickElem.style.display = 'block';
                resultsElem.style.display = 'block';
            break;
        case 'ended':
                newGameBtn.innerText = 'Play again';
                playerPickElem.textContent = "Player's choice";
                computerPickElem.textContent = "Computer's choice";
                playerResultElem.textContent = "Player's score";
                computerResultElem.textContent = "Computer's score";
        case 'notStarted':
        default:
                newGameElem.style.display = 'block';
                pickElem.style.display = 'none';
                resultsElem.style.display = 'none';
    }
}

setGameElements();

var playerPointsElem = document.getElementById('js-playerPoints'),
    playerNameElem = document.getElementById('js-playerName'),
    computerPointsElem = document.getElementById('js-computerPoints');

function newGame() {
  swal({
    title: "Who are you?",
    text: "Type your name:",
    type: "input",
    showCancelButton: true,
    closeOnConfirm: false,
    animation: "slide-from-top",
    inputPlaceholder: "player's name"
  },
  function(inputValue){
    if (inputValue === false) return false;

    if (inputValue === "") {
      swal.showInputError("You need to write your name!");
      return false;
    }
    swal("Let's start!", "Take a challenge " + inputValue, "success");
    player.name = inputValue;
    
    
    if (player.name) {
      player.score = computer.score = 0;
      gameState = 'started';
      setGameElements();

      playerNameElem.innerHTML = player.name;
      setGamePoints();
    }
  });   

} 

function playerPick(playerPick) {  
    console.log(playerPick);
}

function getComputerPick() {
    var possiblePicks = ['player1', 'player2', 'judge'];
    return possiblePicks[Math.floor(Math.random()*3)];
}

var playerPickElem = document.getElementById('js-playerPick'),
    computerPickElem = document.getElementById('js-computerPick'),
    playerResultElem = document.getElementById('js-playerResult'),
    computerResultElem = document.getElementById('js-computerResult');

function playerPick(playerPick) {
    var computerPick = getComputerPick();
    
    playerPickElem.innerHTML = playerPick;
    computerPickElem.innerHTML = computerPick;
    checkRoundWinner(playerPick, computerPick);
}

function checkRoundWinner(playerPick, computerPick) {
    playerResultElem.innerHTML = computerResultElem.innerHTML = '';

    var winnerIs = 'player';

    if (playerPick == computerPick) {
        winnerIs = 'noone'; // remis
        playerResultElem.innerHTML = "Tie!";
        computerResultElem.innerHTML = "Tie!";
    } else if (
        (computerPick == 'player1' &&  playerPick == 'player2') ||
        (computerPick == 'player2' &&  playerPick == 'judge') ||
        (computerPick == 'judge' &&  playerPick == 'player1')) {

        winnerIs = 'computer';
    }

    if (winnerIs == 'player') {
        playerResultElem.innerHTML = "Win!";
        player.score++;
    } else if (winnerIs == 'computer') {
        computerResultElem.innerHTML = "Win!";
        computer.score++;
    }

    setGamePoints();
    gameFinished();
}

function setGamePoints() {
    playerPointsElem.innerHTML = player.score;
    computerPointsElem.innerHTML = computer.score;
}

function gameFinished() {
    if (player.score == 10) {
        swal("Hooray!", player.name + " wins!", "success")
        gameState = 'ended'
    } else if (computer.score == 10) {
        sweetAlert({
        title: "Oh no!", 
        text: "Computer is the winner", 
        type: "error"
    });
        gameState = 'ended'
    }
    setGameElements();
}
