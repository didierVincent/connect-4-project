/*----------------------------------- constants ---------------------------------------------*/

/*----------------------------------- default settings -----------------------------------*/

//declare players with Red and Blue
const playerRed = "Red";
const playerBlue = "Blue";

//set starting default player to player one
let playerTurn = playerRed;

/*-------- model: creating a nested board array to represent the game state using JS & assigning coordinates as id values --------*/
let board = [];
const rows = 6;
const columns = 7;
let gameEnd = false;

function makeBoard() {
  board = [];
  for (let i = 0; i < rows; i++) {
    let row = [];
    for (let x = 0; x < columns; x++) {
      //for model ---> creating and adding (column,row) co-ordinate notation for each iteration
      row.push(x.toString() + "," + i.toString());
    }
    //for model --> after each full column array is created, we need to add that array to the board array
    board.push(row);
  }
}

makeBoard();

/*------------------------- view: creating board for HTML using JS & assigning coordinates as id values -------------------------*/

function renderBoard() {
  for (let i = 0; i < rows; i++) {
    let row = [];
    for (let x = 0; x < columns; x++) {
      //for view ---> create divs with coordinate ids, and a unique class to style later in css
      let space = document.createElement("div");
      space.id = x.toString() + "." + i.toString();
      space.classList.add("space");
      //for view ---> adding divs to existing board div in html
      document.getElementById("board").appendChild(space);
    }
  }
}

renderBoard();

/*----------------------------------- model: (board database) initialise column data with row property set to lowest row (6) -----------------------------------*/
function initBoardData() {
  colData = {
    column0: {
      c: 0,
      r: 6,
      p: null,
    },

    column1: {
      c: 1,
      r: 6,
      p: null,
    },

    column2: {
      c: 2,
      r: 6,
      p: null,
    },

    column3: {
      c: 3,
      r: 6,
      p: null,
    },

    column4: {
      c: 4,
      r: 6,
      p: null,
    },

    column5: {
      c: 5,
      r: 6,
      p: null,
    },

    column6: {
      c: 6,
      r: 6,
      p: null,
    },
  };
  columnRow = Object.values(colData);
}

let colData = {
  column0: {
    c: 0,
    r: 6,
    p: null,
  },

  column1: {
    c: 1,
    r: 6,
    p: null,
  },

  column2: {
    c: 2,
    r: 6,
    p: null,
  },

  column3: {
    c: 3,
    r: 6,
    p: null,
  },

  column4: {
    c: 4,
    r: 6,
    p: null,
  },

  column5: {
    c: 5,
    r: 6,
    p: null,
  },

  column6: {
    c: 6,
    r: 6,
    p: null,
  },
};

/*----------------------------------- model: update board database after placing a piece -----------------------------------*/

function updatePlayableSpaces(event) {
  if (gameEnd) {
    return;
  }
  const coords = event.target.id.split(".");
  let cr = colData["column" + coords[0]];
  let crV = colData["column" + coords[0]].r;

  if (crV < 0) {
    console.log("row property unchanged: " + crV);
    return;
  } else if (playerTurn === playerRed) {
    cr["r" + crV] = "red";
    cr.p = "on";
    colData["column" + coords[0]].r -= 1;
    checkWin();
  } else if (playerTurn === playerBlue) {
    cr["r" + crV] = "blue";
    cr.p = "on";
    colData["column" + coords[0]].r -= 1;
    checkWin();
  }
}
document
  .getElementById("board")
  .addEventListener("click", updatePlayableSpaces);

/*----------------- view: check board database for column data then change background color to place piece (return if no space in column) -----------------*/

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
    console.log(colData);
  } else if (playerTurn === playerBlue) {
    bottomSpace.style.backgroundColor = "#669bbc"; // blue
    playerTurn = playerRed;
    console.log(colData);
  }
}

document.getElementById("board").addEventListener("click", setColour);

/*----------------------------------- checking for wins -----------------------------------*/
let columnRow = Object.values(colData);

function checkHorizontalWin() {
  for (let y = 1; y < 7; y++)
    for (let z = 0; z < columns - 3; z++) {
      if (
        columnRow[z].p === "on" &&
        columnRow[z + 1].p === "on" &&
        columnRow[z + 2].p === "on" &&
        columnRow[z + 3].p === "on"
      ) {
        console.log("horizontal checking colors");
        if (
          columnRow[z]["r" + y] === columnRow[z + 1]["r" + y] &&
          columnRow[z + 1]["r" + y] === columnRow[z + 2]["r" + y] &&
          columnRow[z + 2]["r" + y] === columnRow[z + 3]["r" + y] &&
          columnRow[z]["r" + y] != undefined
        ) {
          setTimeout(showWinner, 1);
          setTimeout(endGame, 2);
          console.log("HORIZONTAL WINNNN");
          return;
        }
      }
    }
}

function checkVerticalWin() {
  for (let y = 1; y < 7; y++)
    for (let z = 0; z < columns; z++) {
      if (columnRow[z].p === "on") {
        console.log("vert checking colors");
        if (
          columnRow[z]["r" + y] === columnRow[z]["r" + (y + 1)] &&
          columnRow[z]["r" + y] === columnRow[z]["r" + (y + 2)] &&
          columnRow[z]["r" + y] === columnRow[z]["r" + (y + 3)] &&
          columnRow[z]["r" + y] != undefined
        ) {
          setTimeout(showWinner, 1);
          setTimeout(endGame, 2);
          console.log("VERTICAL WINNNN");
          return;
        }
      }
    }
}

function checkDiagWinOne() {
  for (let y = 1; y < 4; y++)
    for (let z = 0; z < columns - 3; z++) {
      if (
        columnRow[z].p === "on" &&
        columnRow[z + 1].p === "on" &&
        columnRow[z + 2].p === "on" &&
        columnRow[z + 3].p === "on"
      ) {
        console.log("diag 1 checking colors");
        if (
          columnRow[z]["r" + y] === columnRow[z + 1]["r" + (y + 1)] &&
          columnRow[z]["r" + y] === columnRow[z + 2]["r" + (y + 2)] &&
          columnRow[z]["r" + y] === columnRow[z + 3]["r" + (y + 3)] &&
          columnRow[z]["r" + y] != undefined
        ) {
          setTimeout(showWinner, 1);
          setTimeout(endGame, 2);
          console.log("diag 1 WINNNN");
          return;
        }
      }
    }
}

function checkDiagWinTwo() {
  for (let y = 1; y < 7; y++)
    for (let z = 0; z < columns; z++) {
      if (
        columnRow[z].p === "on" &&
        columnRow[z + 1].p === "on" &&
        columnRow[z + 2].p === "on" &&
        columnRow[z + 3].p === "on"
      ) {
        console.log("diag 2 checking colors");
        if (
          columnRow[z]["r" + y] === columnRow[z + 1]["r" + (y - 1)] &&
          columnRow[z]["r" + y] === columnRow[z + 2]["r" + (y - 2)] &&
          columnRow[z]["r" + y] === columnRow[z + 3]["r" + (y - 3)] &&
          columnRow[z]["r" + y] != undefined
        ) {
          setTimeout(showWinner, 1);
          setTimeout(endGame, 2);
          console.log("diag 2 WINNNN");
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

/*----------------------------------- view: setting up 'your move!' boxes & game messages -----------------------------------*/

const gameMsg = document.getElementById("ext2");
const redMoveBox = document.getElementById("ext1");
const blueMoveBox = document.getElementById("ext3");

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

document.getElementById("board").addEventListener("click", warnInvalidMove);

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

function showPlayerTurn() {
  if (gameEnd) {
    return;
  }
  if (playerTurn === playerRed) {
    //reset blue
    blueMoveBox.style.backgroundColor = "#f3fbfb"; //grey
    blueMoveBox.style.fontSize = "100%";
    blueMoveBox.innerHTML = "waiting for other player...";
    //change red
    redMoveBox.style.backgroundColor = "#d62839"; //red
    redMoveBox.style.fontSize = "120%";
    redMoveBox.innerHTML = "Player 1 move!";
    redMoveBox.style.borderStyle = "groove solid";
  } else {
    //reset red
    redMoveBox.style.backgroundColor = "#f3fbfb"; //grey
    redMoveBox.style.fontSize = "100%";
    redMoveBox.innerHTML = "waiting for other player...";
    // change blue
    blueMoveBox.style.backgroundColor = "#669bbc"; //blue
    blueMoveBox.style.fontSize = "120%";
    blueMoveBox.innerHTML = "Player 2 move!";
    blueMoveBox.style.borderStyle = "groove solid";
  }
}
document.getElementById("board").addEventListener("click", showPlayerTurn);

/*----------------------------------- game end & resetting -----------------------------------*/
function initTurnBoxes() {
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
}

setTimeout(initTurnBoxes, 750);

function endGame() {
  gameEnd = true;
}

function resetBoard() {
  gameEnd = false;
  playerTurn = playerRed;
  setTimeout(initTurnBoxes, 300);
  initBoardData();
  resetColors();
}

function resetColors() {
  let spaces = document.getElementById("board").getElementsByTagName("div");
  for (let i = 0; i < spaces.length; i++) {
    spaces[i].style.background = "aliceblue";
  }
}

document.getElementById("restartButton").addEventListener("click", resetBoard);

function gameOver() {
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
    console.log("GAME OVER");
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

document.getElementById("board").addEventListener("click", gameOver);

//vertically
//diagonally (1/2)
//diagonally (2/2)

/*----- state variables -----*/

/*----- cached elements  -----*/

/*----- event listeners -----*/

/*----- functions -----*/

/*----- model functions -----*/

/*----- controller functions -----*/

/*----- view functions -----*/

/*----- view - features -----*/

// console.log(redMoveBox);
