/*----------------------------------- constants ---------------------------------------------*/

/*----------------------------------- default settings -----------------------------------*/

//declare players with Red and Blue
const playerRed = "Red";
const playerBlue = "Blue";

//set starting default player to player one
let playerTurn = playerRed;

/*-------- model: creating a nested board array to represent the game state using JS & assigning coordinates as id values --------*/

const board = [];

const rows = 6;
const columns = 7;

function makeBoard() {
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

const colData = {
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

// function updatePlayableSpaces(event) {
//   const coords = event.target.id.split(".");
//   const bottomSpace = document.getElementById(
//     coords[0] + "." + colData["column" + coords[0]].r
//   );
//   if (colData["column" + coords[0]].r < 0) {
//     console.log("row property unchanged: " + colData["column" + coords[0]].r);
//     return;
//   } else {
//     colData["column" + coords[0]].r -= 1;
//     horizontalWin();
//   }
// }

// function updatePlayableSpaces(event) {
//   const coords = event.target.id.split(".");
//   if (colData["column" + coords[0]].r < 0) {
//     console.log("row property unchanged: " + colData["column" + coords[0]].r);
//     return;
//   } else if (playerTurn === playerRed) {
//     colData["column" + coords[0]].p = "red";
//     colData["column" + coords[0]].r -= 1;
//     console.log(colData["column" + coords[0]].p);
//     console.log(colData["column" + coords[0]].r);
//     horizontalWin();
//   } else if (playerTurn === playerBlue) {
//     colData["column" + coords[0]].p = "blue";
//     colData["column" + coords[0]].r -= 1;
//     console.log(colData["column" + coords[0]].p);
//     console.log(colData["column" + coords[0]].r);
//     horizontalWin();
//   }
// }

// function updatePlayableSpaces(event) {
//   const coords = event.target.id.split(".");
//   if (colData["column" + coords[0]].r < 0) {
//     console.log("row property unchanged: " + colData["column" + coords[0]].r);
//     return;
//   } else if (playerTurn === playerRed) {
//     colData["column" + coords[0]]["r" + colData["column" + coords[0]].r] =
//       "red";
//     colData["column" + coords[0]].r -= 1;
//     console.log(
//       colData["column" + coords[0]]["r" + colData["column" + coords[0]].r]
//     );
//     console.log(colData["column" + coords[0]].r);
//     console.log(colData["column" + coords[0]]);
//     horizontalWin();
//   } else if (playerTurn === playerBlue) {
//     colData["column" + coords[0]]["r" + colData["column" + coords[0]].r] =
//       "blue";
//     colData["column" + coords[0]].r -= 1;
//     console.log(
//       colData["column" + coords[0]]["r" + colData["column" + coords[0]].r]
//     );
//     console.log(colData["column" + coords[0]].r);
//     console.log(colData["column" + coords[0]]);
//     horizontalWin();
//   }
// }

function updatePlayableSpaces(event) {
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
    // console.log(cr["r" + crV]);
    // console.log(crV);
    // console.log("crV: " + typeof crV);
    console.log(cr);
    // console.log("cr: " + typeof cr);
    // checkHorizontalWin();
    checkVerticalWin();
  } else if (playerTurn === playerBlue) {
    cr["r" + crV] = "blue";
    cr.p = "on";
    colData["column" + coords[0]].r -= 1;
    // console.log(cr["r" + crV]);
    // console.log(crV);
    // console.log("crV: " + typeof crV);
    console.log(cr);
    // console.log("cr: " + typeof cr);
    // checkHorizontalWin();
    checkVerticalWin();
  }
}
document
  .getElementById("board")
  .addEventListener("click", updatePlayableSpaces);

/*----------------- view: check board database for column data then change background color to place piece (return if no space in column) -----------------*/

// function setColour(event) {
//   const coords = event.target.id.split(".");
//   const bottomSpace = document.getElementById(
//     coords[0] + "." + colData["column" + coords[0]].r
//   );
//   // console.log(event.target.id);
//   if (colData["column" + coords[0]].r < 0) {
//     console.log("row property unchanged: " + colData["column" + coords[0]].r);
//     return;
//   } else if (playerTurn === playerRed) {
//     bottomSpace.style.backgroundColor = "#d62839"; // red
//     playerTurn = playerBlue;
//   } else if (playerTurn === playerBlue) {
//     bottomSpace.style.backgroundColor = "#669bbc"; // blue
//     playerTurn = playerRed;
//   }
// }

function setColour(event) {
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

document.getElementById("board").addEventListener("click", setColour);

function warnInvalidMove(event) {
  const coords = event.target.id.split(".");
  const errMsg = document.getElementById("ext2");
  errMsg.style.transition = "500ms";
  if (colData["column" + coords[0]].r < 0) {
    errMsg.innerHTML = "Invalid Move!";
    errMsg.style.fontSize = "32px";
    errMsg.style.color = "#d62839";
    errMsg.style.backgroundColor = "#0f1a20";
    return;
  } else {
    errMsg.innerHTML = "Game Messages";
    errMsg.style.fontSize = "16px";
    errMsg.style.color = "black";
    errMsg.style.backgroundColor = "white";
  }
}

document.getElementById("board").addEventListener("click", warnInvalidMove);

/*----------------------------------- checking for wins -----------------------------------*/
//-------checking for horizontal wins-------//
//drafting ideas below:

// console.log(typeof colData);
// console.log(colData["column0"]);
// console.log(colData.column0.r);
// console.log(colData["column" + (coords[0] + 1)]);

//draft code #1.1
// function checkHorizontalWin() {
//   if (
//     colData.column0.r < 6 &&
//     colData.column0.r === colData.column1.r &&
//     colData.column1.r === colData.column2.r &&
//     colData.column2.r === colData.column3.r
//   ) {
//     console.log("WIN");
//   }
// }

//document.getElementById("board").addEventListener("click", checkHorizontalWin)

//draft code #1.2
// function checkHorizontalWin(event) {
//   const coords = event.target.id.split(".");
//   // console.log(colData["column" + coords[0]].r);
//   console.log("test" + (parseInt(coords[0]) + 1));
//   console.log(colData["column" + (parseInt(coords[0]) + 1)].r);

// console.log(colData["column" + (coords[0] * 1 + 1).toString]); .toString didnt work...
//   if (
//     colData["column" + coords[0]].r < 6 &&
//     colData["column" + coords[0]].r ===
//       colData["column" + (coords[0] * 1 + 1)].r &&
//     colData["column" + (coords[0] * 1 + 1)].r ===
//       colData["column" + (coords[0] * 1 + 2)].r &&
//     colData["column" + (coords[0] * 1 + 2)].r ===
//       colData["column" + (coords[0] * 1 + 3)].r
//   ) {
//     console.log("WIN");
//   }
// }

//document.getElementById("board").addEventListener("click", checkHorizontalWin)

//draft code #1.3
//i thought the below code was perfect but it only checks if the next 3 columns match from the point that's clicked...
//need to create a function that just scans the board regardless of the click location

// function checkHorizontalWin(event) {
//   const coords = event.target.id.split(".");
//   let c = coords[0];
//   console.log(colData["column" + (parseInt(c) + 3)].r);
//   if (
//     colData["column" + c].r < 6 &&
//     colData["column" + c].r === colData["column" + (parseInt(c) + 1)].r &&
//     colData["column" + c].r === colData["column" + (parseInt(c) + 2)].r &&
//     colData["column" + c].r === colData["column" + (parseInt(c) + 3)].r
//   ) {
//     console.log("WIN");
//   }
// }

// document.getElementById("board").addEventListener("click", checkHorizontalWin);

//new idea: create a for loop to check the board state

// console.log(board);
// console.log(board[0]);
// console.log(board[0][0]);
// console.log(typeof board[0][0]);
// console.log(board[0][0].split(","));

//\\

// console.log(colData);
// console.log(Object.values(colData));
// console.log(Object.values(colData)[0]);

// console.log(Object.values(colData)[3].r); // this returns column3's row value as a number (6)
// console.log(typeof Object.values(colData)[3].r);
// console.log("logging keys below");
// console.log(Object.values(colData));

// columnRow.forEach((row) => console.log(row.r)); //this is logging all the r values in the object, can access row value with row.r

const columnRow = Object.values(colData); //this is an array of objects
// console.log(columnRow[0].r); //row value of column 0
let foo = columnRow[0]; //test
// console.log(columnRow[0 + 4].r); //test

// console.log(Object.values(colData));

// function checkHorizontalWin() {
//   for (let z = 0; z < columns - 3; z++) {
//     if (columnRow[z].p === "on" && columnRow[z].r < 6) {
//       if (
//         columnRow[z].r === columnRow[z + 1].r &&
//         columnRow[z].r === columnRow[z + 2].r &&
//         columnRow[z].r === columnRow[z + 3].r
//       ) {
//         for (let y = 0; y < rows; y++) {
//           console.log("testing rows");
//           if (
//             columnRow[y]["r" + y] === columnRow[y + 1]["r" + y] &&
//             columnRow[y]["r" + y] === columnRow[y + 2]["r" + y] &&
//             columnRow[y]["r" + y] === columnRow[y + 3]["r" + y]
//           ) {
//             console.log("HORIZONTAL WINNNN");
//           }
//         }
//       }
//     }
//   }
// }

function checkHorizontalWin() {
  for (let y = 1; y < 7; y++)
    for (let z = 0; z < columns - 3; z++) {
      if (
        columnRow[z].p === "on" &&
        columnRow[z + 1].p === "on" &&
        columnRow[z + 2].p === "on" &&
        columnRow[z + 3].p === "on"
      ) {
        console.log("checking colors");
        if (
          columnRow[z]["r" + y] === columnRow[z + 1]["r" + y] &&
          columnRow[z + 1]["r" + y] === columnRow[z + 2]["r" + y] &&
          columnRow[z + 2]["r" + y] === columnRow[z + 3]["r" + y] &&
          columnRow[z]["r" + y] != undefined &&
          columnRow[z + 1]["r" + y] != undefined &&
          columnRow[z + 2]["r" + y] != undefined &&
          columnRow[z + 3]["r" + y] != undefined
        ) {
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
        console.log("checking colors");
        if (
          columnRow[z]["r" + y] === columnRow[z]["r" + (y + 1)] &&
          columnRow[z]["r" + y] === columnRow[z]["r" + (y + 2)] &&
          columnRow[z]["r" + y] === columnRow[z]["r" + (y + 3)] &&
          columnRow[z]["r" + y] != undefined &&
          columnRow[z]["r" + (y + 1)] != undefined &&
          columnRow[z]["r" + (y + 2)] != undefined &&
          columnRow[z]["r" + (y + 3)] != undefined
        ) {
          console.log("VERTICAL WINNNN");
          return;
        }
      }
    }
}

// console.log(columnRow[0]["r" + 6]);

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

const playerRedTurn = document.getElementById("ext1");
const playerBlueTurn = document.getElementById("ext3");
// console.log(playerRedTurn);

function showPlayerTurn() {
  if (playerTurn === playerRed) {
    //reset blue
    playerBlueTurn.style.backgroundColor = "#f3fbfb"; //grey
    playerBlueTurn.style.fontSize = "100%";
    playerBlueTurn.innerHTML = "waiting for other player...";
    //change red
    playerRedTurn.style.backgroundColor = "#d62839"; //red
    playerRedTurn.style.fontSize = "120%";
    playerRedTurn.innerHTML = "Player 1 move!";
    playerRedTurn.style.borderStyle = "groove solid";
  } else {
    //reset red
    playerRedTurn.style.backgroundColor = "#f3fbfb"; //grey
    playerRedTurn.style.fontSize = "100%";
    playerRedTurn.innerHTML = "waiting for other player...";
    // change blue
    playerBlueTurn.style.backgroundColor = "#669bbc"; //blue
    playerBlueTurn.style.fontSize = "120%";
    playerBlueTurn.innerHTML = "Player 2 move!";
    playerBlueTurn.style.borderStyle = "groove solid";
  }
}
document.getElementById("board").addEventListener("click", showPlayerTurn);

function initTurnBoxes() {
  playerRedTurn.innerHTML = "Player 1 move!";
  playerRedTurn.style.transition = "500ms";
  playerBlueTurn.style.transition = "500ms";
  playerRedTurn.style.backgroundColor = "#d62839";
  playerRedTurn.style.fontSize = "120%";
}

setTimeout(initTurnBoxes, 750);
