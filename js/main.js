/*----------------------------------- constants ---------------------------------------------*/

/*----------------------------------- default settings -----------------------------------*/

//declare players with Red and Blue
const playerRed = "Red";
const playerBlue = "Blue";

//set starting default player to player one
let playerTurn = playerRed;

/*------------------------- creating the grid using JS, and storing coordinate data -------------------------*/

//need to generate <div> tags for the html inside the board div with ([column],[row]) coordinates
const board = [];

//need to create column arrays to nest inside board div in html, & to add to a board array to reference later for checking wins using coordinates
const rows = 6;
const columns = 7;

function makeBoard() {
  for (let i = 0; i < rows; i++) {
    let row = [];
    for (let x = 0; x < columns; x++) {
      //FOR JS ---> creating and adding (column,row) co-ordinate notation for each iteration
      row.push(x.toString() + "," + i.toString());
    }
    //For JS --> after each full column array is created, we need to add that array to the board array
    board.push(row);
  }
}

makeBoard();

function renderBoard() {
  for (let i = 0; i < rows; i++) {
    let row = [];
    for (let x = 0; x < columns; x++) {
      let space = document.createElement("div");
      space.id = x.toString() + "." + i.toString();
      space.classList.add("space");
      //Add to board div
      document.getElementById("board").appendChild(space);
    }
  }
}

renderBoard();

//testing that the board has nested arrays inside (used chrome dev tools to check html divs are correct)
console.log("below is a console log of board");
console.log(board);

/*----------------------------------- placing a piece -----------------------------------*/
//need to change a div background color to red or blue
//do this by changing the class to .redPiece or .bluePiece
//alternate between players, so after class is set to red, make the next click set to blue and vice versa

// let space = document.getElementsByClassName("space")

const colData = {
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

/*----------------------------------- coordinate system to place piece at lowest row available (or return if no space) -----------------------------------*/

//future for???set starting default row position for each column???
//so when a column is clicked, the div at the columnRow r value is checked and placed, and then updated
// let columnRow = [5, 5, 5, 5, 5, 5, 5];
// columnRow[c] = row

//idea: extract the ID from each div (to use as coordinates) and create an array
let spaceDiv = document.querySelectorAll(".space");
console.log("below is a console log of spaceDiv");
console.log(spaceDiv);

function updatePlayableSpaces(event) {
  const coords = event.target.id.split(".");
  const bottomSpace = document.getElementById(
    coords[0] + "." + colData["column" + coords[0]].r
  );
  // console.log(event.target.id);
  if (colData["column" + coords[0]].r < 0) {
    console.log("row property unchanged: " + colData["column" + coords[0]].r);
    return;
  } else {
    colData["column" + coords[0]].r -= 1;
  }
}

document
  .getElementById("board")
  .addEventListener("click", updatePlayableSpaces);

// function updatePlayableSpaces() {
//   spaceDiv.forEach((spaceDiv) => {
//     spaceDiv.addEventListener("click", function (evt) {
//       //convert clicked div id (0,0) string --> array = ["column", "row"]
//       let coord = spaceDiv.id.split(",");
//       //testing
//       // console.log("below is a console log of coord");
//       // console.log(coord);
//       //grab column value
//       let c = coord[0];
//       //testing if i can access the object using the code below
//       // console.log("column was set at row " + colData["column" + c].r);
//       //checking if string or checking existing object
//       // console.log("typeof: " + typeof colData["column" + c].r);

//       if (colData["column" + c].r <= 0) {
//         console.log("row property unchanged: " + colData["column" + c].r);
//         return;
//       } else {
//         colData["column" + c].r -= 1;
//       }
//       // console.log("row property updated to " + colData["column" + c].r);
//     });
//   });
// }

// updatePlayableSpaces();

// console.log("below is a console log of board with index 0");
// console.log(board[0]);

// let spaceDiv = document.querySelectorAll(".space");

// spaceDiv.forEach((spaceDiv) => {
// let coord = spaceDiv.id.split(",");
// let c = coord[0];
// let r = coord[1];
// });

// console.log("below is a console log of coord");
// console.log(coord);

// function viewSetPiece() {
//   spaceDiv.forEach((spaceDiv) => {
//     spaceDiv.addEventListener("click", function (evt) {
//       let coord = spaceDiv.id.split(",");
//       let c = coord[0];
//       let r = coord[1];

//       const bottomRowDiv = spaceDiv;
//       bottomRowDiv.id = colData["column" + c].c + "," + colData["column" + c].r;
//       console.log("below is a console log of bottomRowDiv");
//       console.log(bottomRowDiv);

//       if (playerTurn === playerRed) {
//         //add class to div with same c value, at r value (colData["column" + c].r)
//         bottomRowDiv.classList.add("red-space");
//         playerTurn = playerBlue;
//       } else {
//         //testing
//         // console.log("blue is placed here");
//         bottomRowDiv.classList.add("blue-space");
//         playerTurn = playerRed;
//       }
//     });
//   });
// }

// function viewSetPiece() {
//   const bottomRowDiv = spaceDiv;
//   bottomRowDiv.id = colData["column" + c].c + "," + colData["column" + c].r;

//   spaceDiv.forEach((spaceDiv) => {
//     let coord = spaceDiv.id.split(",");
//     let c = coord[0];
//     let r = coord[1];
//     spaceDiv.addEventListener("click", function (evt) {
//       if (playerTurn === playerRed) {
//         spaceDiv.classList.add("red-space");
//         playerTurn = playerBlue;
//       } else {
//         //testing
//         // console.log("blue is placed here");
//         spaceDiv.classList.add("blue-space");
//         playerTurn = playerRed;
//       }
//     });
//   });
// }
function setColour(event) {
  const coords = event.target.id.split(".");
  const bottomSpace = document.getElementById(
    coords[0] + "." + colData["column" + coords[0]].r
  );
  // console.log(event.target.id);
  if (colData["column" + coords[0]].r < 0) {
    console.log("row property unchanged: " + colData["column" + coords[0]].r);
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

// viewSetPiece();

/*----------------------------------- model: creating database for each space -----------------------------------*/
//need to create a database for each space.
//each space will need to be an object & have 3 properties each
//properties: x : column value, y : row value, active: red/blue/null
//will need to create 42 objects?, so should build them using a Class?
//or create 7 objects for each column?

//
/*----------------------------------- random old code below -----------------------------------*/

//  const playableRow = columnRow[c]

//  console.log(coord)

//  if (playableRow < 1) { // to avoid placing if there if the highest row is full
//   return; //early return if row = 0
//  } else {
//   columnRow.arraymethod to change columnRow[c] to (c -= 1)
//   place piece at new position [c]

//  }

/*----------------------------------- checking for wins -----------------------------------*/

/*----- state variables -----*/

/*----- cached elements  -----*/

/*----- event listeners -----*/

/*----- functions -----*/

/*----- model functions -----*/

/*example board layout from Gab, E = empty, R = red piece, B = blue piece  

board = [
    [E, E, E, E, E],
    [E, E, E, E, E],
    [E, E, E, E, E],
    [E, E, B, E, E],
    [E, R, B, E, E],
]
*/

/*----- controller functions -----*/

/*----- view functions -----*/
