/*----- constants-----*/

/*----------------------------------- default settings -----------------------------------*/

const playerRed = "Red";
const playerBlue = "Blue";
let playerTurn = playerRed;

/*----- state variables -----*/

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
const gameInfo = document.getElementById("gameinfo");
const descInfo = document.getElementById("description");

/*----- event listeners -----*/

document.getElementById("board").addEventListener("click", showMove);
document.getElementById("board").addEventListener("click", updateData);
document.getElementById("board").addEventListener("click", showTurn);
document.getElementById("restartButton").addEventListener("click", resetBoard);
document.getElementById("board").addEventListener("click", endGameDraw);
document.getElementById("board").addEventListener("click", hideInfoBoxes);

/*----- functions & default settings -----*/

init();

function init() {
  rows = 6;
  columns = 7;
  gameEnd = false;
  renderBoard();
  resetData();
  resetFeatures();
}

/*------------------------- view function: creating board for HTML using JS & assigning coordinates as id values -------------------------*/

function renderBoard() {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      let space = document.createElement("div");
      space.id = c.toString() + "." + r.toString();
      space.classList.add("space");
      document.getElementById("board").appendChild(space);
    }
  }
}

/*----------------------------------- view function: check board database for column data, then place piece if legal & reset game message -----------------------------------*/

function showMove(event) {
  if (gameEnd) {
    return;
  }
  const coords = event.target.id.split(".");
  const bottomSpace = document.getElementById(
    coords[0] + "." + colData["column" + coords[0]].r
  );
  let crV = colData["column" + coords[0]].r;
  if (crV < 0) {
    warnInvalidMove();
    return;
  } else if (playerTurn === playerRed) {
    bottomSpace.style.backgroundColor = "#d62839"; // red
    resetMsgBoxOnly();
  } else if (playerTurn === playerBlue) {
    bottomSpace.style.backgroundColor = "#669bbc"; // blue
    resetMsgBoxOnly();
  }
}

/*----------------------------------- model function: update board object database 'colData' after placing a piece -----------------------------------*/

function updateData(event) {
  if (gameEnd) {
    return;
  }
  const coords = event.target.id.split(".");
  let cD = colData["column" + coords[0]];
  let crV = colData["column" + coords[0]].r;
  if (crV < 0) {
    return;
  } else if (playerTurn === playerRed) {
    cD.p = "on";
    cD["r" + crV] = "red";
    colData["column" + coords[0]].r -= 1;
    checkWin();
    playerTurn = playerBlue;
  } else if (playerTurn === playerBlue) {
    cD.p = "on";
    colData["column" + coords[0]].r -= 1;
    cD["r" + crV] = "blue";
    checkWin();
    playerTurn = playerRed;
  }
}

/*----------------------------------- model functions: game logic, checking for wins -----------------------------------*/

function checkHorizontalWin() {
  for (let y = 0; y < rows; y++)
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
          showWin();
          updateScore();
          endGame();
          return;
        }
      }
    }
}

function checkVerticalWin() {
  for (let y = 0; y < rows; y++)
    for (let z = 0; z < columns; z++) {
      let firstPiece = columnRow[z]["r" + y];
      if (
        firstPiece === columnRow[z]["r" + (y + 1)] &&
        firstPiece === columnRow[z]["r" + (y + 2)] &&
        firstPiece === columnRow[z]["r" + (y + 3)] &&
        firstPiece != undefined
      ) {
        showWin();
        updateScore();
        endGame();
        return;
      }
    }
}

function checkDiagWinNWSE() {
  for (let y = 0; y < rows - 3; y++)
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
          showWin();
          updateScore();
          endGame();
          return;
        }
      }
    }
}

function checkDiagWinSWNE() {
  for (let y = 3; y < rows; y++)
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
          showWin();
          updateScore();
          endGame();
          return;
        }
      }
    }
}

function checkWin() {
  checkHorizontalWin();
  checkVerticalWin();
  checkDiagWinNWSE();
  checkDiagWinSWNE();
}

/*----------------------------------- view functions (features): 'your move!' boxes, game messages, info boxes, score boxes -----------------------------------*/

function showTurn() {
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

function showWin() {
  redMoveBox.style.transition = "2s";
  blueMoveBox.style.transition = "2s";
  gameMsg.style.transition = "2s";
  if (playerTurn === playerRed) {
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

function warnInvalidMove() {
  gameMsg.innerHTML = "Invalid Move!";
  gameMsg.style.fontSize = "32px";
  gameMsg.style.color = "#d62839";
  gameMsg.style.backgroundColor = "#0f1a20";
}

function endGameDraw() {
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

function updateScore() {
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

function hideInfoBoxes() {
  descInfo.style.backgroundColor = "white";
  gameInfo.style.color = "white";
  descInfo.style.color = "white";
  gameInfo.style.border = "none";
  descInfo.style.border = "none";
}

/*----------------------------------- reset functions & other init functions -----------------------------------*/

function resetBoard() {
  gameEnd = false;
  playerTurn = playerRed;
  setTimeout(resetFeatures, 300);
  resetData();
  resetColors();
}

function resetFeatures() {
  redMoveBox.style.transition = "500ms";
  blueMoveBox.style.transition = "500ms";
  gameInfo.style.transition = "1s";
  descInfo.style.transition = "1s";
  gameMsg.style.transition = "500ms";
  p1Score.style.transition = "1.5s";
  p2Score.style.transition = "1.5s";
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
  p1Score.style.backgroundColor = "white";
  p1Score.style.color = "#d62839";
  p2Score.style.backgroundColor = "white";
  p2Score.style.color = "#669bbc";
  gameInfo.style.color = "black";
  descInfo.style.color = "black";
  gameInfo.style.border = "1px solid #cbd1dd";
  descInfo.style.border = "1px solid #cbd1dd";
  descInfo.style.backgroundColor = "#f3fbfb";
}

function resetMsgBoxOnly() {
  gameMsg.innerHTML = "Game Messages";
  gameMsg.style.fontSize = "16px";
  gameMsg.style.color = "black";
  gameMsg.style.backgroundColor = "white";
}

function resetData() {
  colData = {
    column0: {
      c: 0,
      r: 5,
    },

    column1: {
      c: 1,
      r: 5,
    },

    column2: {
      c: 2,
      r: 5,
    },

    column3: {
      c: 3,
      r: 5,
    },

    column4: {
      c: 4,
      r: 5,
    },

    column5: {
      c: 5,
      r: 5,
    },

    column6: {
      c: 6,
      r: 5,
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

/*----------------------------------- end game function -----------------------------------*/

function endGame() {
  gameEnd = true;
}
