/*----- constants-----*/

/*----------------------------------- default settings -----------------------------------*/
const playerRed = "Red";
const playerBlue = "Blue";
let playerTurn = playerRed;

/*----- state variables -----*/
let board;
let rows;
let columns;
let gameEnd;
let columnRow;

/*----- cached elements  -----*/
const p1Score = document.querySelector("score1");
const p2Score = document.querySelector("score2");
const gameMsg = document.getElementById("gameMsg");
const redMoveBox = document.getElementById("redMove");
const blueMoveBox = document.getElementById("blueMove");

/*----- event listeners -----*/
document
  .getElementById("board")
  .addEventListener("click", updatePlayableSpaces);
document.getElementById("board").addEventListener("click", setColour);
document.getElementById("board").addEventListener("click", warnInvalidMove);
document.getElementById("board").addEventListener("click", showPlayerTurn);
document.getElementById("restartButton").addEventListener("click", resetBoard);
document.getElementById("board").addEventListener("click", gameOverDraw);

/*----- functions -----*/
init();

function init() {
  board = [];
  rows = 6;
  columns = 7;
  gameEnd = false;
  makeBoard();
  renderBoard();
  resetData();
  resetFeatures();
}

/*-------- model: creating a nested board array to represent the game state using JS & assigning coordinates as id values --------*/
function makeBoard() {
  for (let i = 0; i < rows; i++) {
    let row = [];
    for (let x = 0; x < columns; x++) {
      row.push(x.toString() + "," + i.toString());
    }
    board.push(row);
  }
}

/*------------------------- view: creating board for HTML using JS & assigning coordinates as id values -------------------------*/

function renderBoard() {
  for (let i = 0; i < rows; i++) {
    let row = [];
    for (let x = 0; x < columns; x++) {
      let space = document.createElement("div");
      space.id = x.toString() + "." + i.toString();
      space.classList.add("space");
      document.getElementById("board").appendChild(space);
    }
  }
}

/*----------------------------------- model function: update board object database 'colData' after placing a piece -----------------------------------*/

function updatePlayableSpaces(event) {
  if (gameEnd) {
    return;
  }
  const coords = event.target.id.split(".");
  let cD = colData["column" + coords[0]];
  let crV = colData["column" + coords[0]].r;

  if (crV < 0) {
    return;
  } else if (playerTurn === playerRed) {
    cD["r" + crV] = "red";
    cD.p = "on";
    colData["column" + coords[0]].r -= 1;
    checkWin();
  } else if (playerTurn === playerBlue) {
    cD["r" + crV] = "blue";
    cD.p = "on";
    colData["column" + coords[0]].r -= 1;
    checkWin();
  }
}

/*----------------------------------- view function: check board database for column data, then place piece & swap player -----------------------------------*/

function setColour(event) {
  if (gameEnd) {
    return;
  }
  const coords = event.target.id.split(".");
  const bottomSpace = document.getElementById(
    coords[0] + "." + colData["column" + coords[0]].r
  );
  if (colData["column" + coords[0]].r < 0) {
    return;
  } else if (playerTurn === playerRed) {
    bottomSpace.style.backgroundColor = "#d62839"; // red
    playerTurn = playerBlue;
  } else if (playerTurn === playerBlue) {
    bottomSpace.style.backgroundColor = "#669bbc"; // blue
    playerTurn = playerRed;
  }
}

/*----------------------------------- model functions: game logic, checking for wins -----------------------------------*/

function checkHorizontalWin() {
  for (let y = 1; y < 7; y++)
    for (let z = 0; z < columns - 3; z++) {
      let firstPiece = columnRow[z]["r" + y];
      if (
        columnRow[z].p === "on" &&
        columnRow[z + 1].p === "on" &&
        columnRow[z + 2].p === "on" &&
        columnRow[z + 3].p === "on"
      ) {
        if (
          firstPiece === columnRow[z + 1]["r" + y] &&
          firstPiece === columnRow[z + 2]["r" + y] &&
          firstPiece === columnRow[z + 3]["r" + y] &&
          firstPiece != undefined
        ) {
          setTimeout(showWinner, 1);
          addScore();
          setTimeout(endGame, 1);
          return;
        }
      }
    }
}

function checkVerticalWin() {
  for (let y = 1; y < 7; y++)
    for (let z = 0; z < columns; z++) {
      let firstPiece = columnRow[z]["r" + y];
      if (
        firstPiece === columnRow[z]["r" + (y + 1)] &&
        firstPiece === columnRow[z]["r" + (y + 2)] &&
        firstPiece === columnRow[z]["r" + (y + 3)] &&
        firstPiece != undefined
      ) {
        setTimeout(showWinner, 1);
        addScore();
        setTimeout(endGame, 1);
        return;
      }
    }
}

function checkDiagWinOne() {
  for (let y = 1; y < 4; y++)
    for (let z = 0; z < columns - 3; z++) {
      let firstPiece = columnRow[z]["r" + y];
      if (
        columnRow[z].p === "on" &&
        columnRow[z + 1].p === "on" &&
        columnRow[z + 2].p === "on" &&
        columnRow[z + 3].p === "on"
      ) {
        if (
          firstPiece === columnRow[z + 1]["r" + (y + 1)] &&
          firstPiece === columnRow[z + 2]["r" + (y + 2)] &&
          firstPiece === columnRow[z + 3]["r" + (y + 3)] &&
          firstPiece != undefined
        ) {
          setTimeout(showWinner, 1);
          addScore();
          setTimeout(endGame, 1);
          return;
        }
      }
    }
}

function checkDiagWinTwo() {
  for (let y = 3; y < 7; y++)
    for (let z = 0; z < columns - 3; z++) {
      let firstPiece = columnRow[z]["r" + y];
      if (
        columnRow[z].p === "on" &&
        columnRow[z + 1].p === "on" &&
        columnRow[z + 2].p === "on" &&
        columnRow[z + 3].p === "on"
      ) {
        if (
          firstPiece === columnRow[z + 1]["r" + (y - 1)] &&
          firstPiece === columnRow[z + 2]["r" + (y - 2)] &&
          firstPiece === columnRow[z + 3]["r" + (y - 3)] &&
          firstPiece != undefined
        ) {
          setTimeout(showWinner, 1);
          addScore();
          setTimeout(endGame, 1);
          return;
        }
      }
    }
}

function checkWin() {
  checkHorizontalWin();
  checkVerticalWin();
  checkDiagWinOne();
  checkDiagWinTwo();
}

/*----------------------------------- view functions (features): 'your move!' boxes, game messages box, score boxes -----------------------------------*/

function showPlayerTurn() {
  if (gameEnd) {
    return;
  }
  if (playerTurn === playerRed) {
    //reset blue
    blueMoveBox.style.backgroundColor = "#f3fbfb"; //clear white
    blueMoveBox.style.fontSize = "100%";
    blueMoveBox.innerHTML = "waiting for other player...";
    //change red
    redMoveBox.style.backgroundColor = "#d62839"; //red
    redMoveBox.style.fontSize = "120%";
    redMoveBox.innerHTML = "Player 1 move!";
  } else {
    //reset red
    redMoveBox.style.backgroundColor = "#f3fbfb"; //clear white
    redMoveBox.style.fontSize = "100%";
    redMoveBox.innerHTML = "waiting for other player...";
    // change blue
    blueMoveBox.style.backgroundColor = "#669bbc"; //blue
    blueMoveBox.style.fontSize = "120%";
    blueMoveBox.innerHTML = "Player 2 move!";
  }
}

function showWinner() {
  redMoveBox.style.transition = "2s";
  blueMoveBox.style.transition = "2s";
  gameMsg.style.transition = "2s";
  if (playerTurn === playerBlue) {
    gameMsg.innerHTML = "Player 1 Wins!!!";
    gameMsg.style.fontSize = "32px";
    gameMsg.style.color = "#001427";
    gameMsg.style.backgroundColor = "#d62839";
    redMoveBox.style.backgroundColor = "#d62839";
    blueMoveBox.style.backgroundColor = "grey";
    redMoveBox.innerHTML = "You win!";
    redMoveBox.style.fontSize = "200%";
    blueMoveBox.style.fontSize = "90%";
    blueMoveBox.innerHTML = "You lost!";
  } else {
    gameMsg.innerHTML = "Player 2 Wins!!!";
    gameMsg.style.fontSize = "32px";
    gameMsg.style.color = "#001427";
    gameMsg.style.backgroundColor = "#669bbc";
    blueMoveBox.style.backgroundColor = "#669bbc";
    redMoveBox.style.backgroundColor = "grey";
    blueMoveBox.innerHTML = "You win!";
    blueMoveBox.style.fontSize = "200%";
    redMoveBox.style.fontSize = "90%";
    redMoveBox.innerHTML = "You lost!";
  }
}

function warnInvalidMove(event) {
  if (gameEnd) {
    return;
  }
  const coords = event.target.id.split(".");
  gameMsg.style.transition = "500ms";
  if (colData["column" + coords[0]].r < 0) {
    gameMsg.innerHTML = "Invalid Move!";
    gameMsg.style.fontSize = "32px";
    gameMsg.style.color = "#d62839";
    gameMsg.style.backgroundColor = "#0f1a20";
    return;
  } else {
    gameMsg.innerHTML = "Game Messages";
    gameMsg.style.fontSize = "16px";
    gameMsg.style.color = "black";
    gameMsg.style.backgroundColor = "white";
  }
}

function gameOverDraw() {
  if (
    colData.column0.r1 &&
    colData.column1.r1 &&
    colData.column2.r1 &&
    colData.column3.r1 &&
    colData.column4.r1 &&
    colData.column5.r1 &&
    colData.column6.r1
  ) {
    endGame();
    gameMsg.innerHTML = "Game Over!";
    gameMsg.style.fontSize = "100%";
    gameMsg.style.background = "black";
    redMoveBox.style.background = "white";
    blueMoveBox.style.background = "white";
    redMoveBox.innerHTML = "Draw!";
    blueMoveBox.innerHTML = "Draw!";
    gameMsg.style.fontSize = "36px";
    gameMsg.style.color = "white";
    redMoveBox.style.fontSize = "28px";
    blueMoveBox.style.fontSize = "28px";
  }
}

function addScore() {
  if (playerTurn === playerRed) {
    let updatingScoreRed = p1Score.innerHTML;
    let scoreNumRed = parseInt(updatingScoreRed.slice(-1));
    let newScoreNumRed = scoreNumRed + 1;
    p1Score.innerHTML = updatingScoreRed.slice(0, -1) + newScoreNumRed;
    p1Score.style.backgroundColor = "#d62839";
    p1Score.style.color = "black";
  } else {
    let updatingScoreBlue = p2Score.innerHTML;
    let scoreNumBlue = parseInt(updatingScoreBlue.slice(-1));
    let newScoreNumBlue = scoreNumBlue + 1;
    p2Score.innerHTML = updatingScoreBlue.slice(0, -1) + newScoreNumBlue;
    p2Score.style.backgroundColor = "#669bbc";
    p2Score.style.color = "black";
  }
}

/*----------------------------------- game end, reset functions & other init functions -----------------------------------*/
function endGame() {
  gameEnd = true;
}

function resetFeatures() {
  redMoveBox.style.transition = "500ms";
  blueMoveBox.style.transition = "500ms";
  gameMsg.style.transition = "500ms";
  redMoveBox.innerHTML = "Player 1 move!";
  blueMoveBox.innerHTML = "waiting for other player...";
  gameMsg.innerHTML = "Game Messages";
  blueMoveBox.style.backgroundColor = "#f3fbfb";
  gameMsg.style.backgroundColor = "#f3fbfb";
  redMoveBox.style.backgroundColor = "#d62839";
  redMoveBox.style.fontSize = "120%";
  blueMoveBox.style.fontSize = "100%";
  gameMsg.style.fontSize = "100%";
  gameMsg.style.color = "black";
  p1Score.style.transition = "1.5s";
  p2Score.style.transition = "1.5s";
  p1Score.style.backgroundColor = "white";
  p1Score.style.color = "#d62839";
  p2Score.style.backgroundColor = "white";
  p2Score.style.color = "#669bbc";
}

function resetBoard() {
  gameEnd = false;
  playerTurn = playerRed;
  setTimeout(resetFeatures, 300);
  resetData();
  resetColors();
}

function resetData() {
  colData = {
    column0: {
      c: 0,
      r: 6,
    },

    column1: {
      c: 1,
      r: 6,
    },

    column2: {
      c: 2,
      r: 6,
    },

    column3: {
      c: 3,
      r: 6,
    },

    column4: {
      c: 4,
      r: 6,
    },

    column5: {
      c: 5,
      r: 6,
    },

    column6: {
      c: 6,
      r: 6,
    },
  };
  columnRow = Object.values(colData);
}

function resetColors() {
  let spaces = document.getElementById("board").getElementsByTagName("div");
  for (let i = 0; i < spaces.length; i++) {
    spaces[i].style.background = "aliceblue";
  }
}
